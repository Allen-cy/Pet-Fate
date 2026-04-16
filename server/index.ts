import express from "express";
import cors from "cors";
import { createSession, getSession, updateSessionPaid } from "./services/supabase";
import { generatePetReport } from "./services/reportGenerator";
import { calculateScores, getWinningPetType } from "./services/scoring";
import type { Answer } from "./data/questions";

const app = express();

app.use(cors());
app.use(express.json());

// POST /api/session - Create session with answers, calculate pet result
app.post("/api/session", async (req, res) => {
  try {
    const { answers, userId } = req.body as { answers: Answer[]; userId?: string };

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: "answers is required" });
    }

    const dimScores = calculateScores(answers);
    const petResult = getWinningPetType(dimScores);

    const session = await createSession({
      answers,
      dimScores,
      petResult,
      userId,
    });

    return res.json({
      sessionId: session.id,
      petResult,
      dimScores,
    });
  } catch (error) {
    console.error("Error creating session:", error);
    return res.status(500).json({ error: "Failed to create session" });
  }
});

// GET /api/session/:sessionId - Get session data
app.get("/api/session/:sessionId", async (req, res) => {
  try {
    const session = await getSession(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    return res.json(session);
  } catch (error) {
    console.error("Error getting session:", error);
    return res.status(500).json({ error: "Failed to get session" });
  }
});

// POST /api/generate-report - Generate AI report
app.post("/api/generate-report", async (req, res) => {
  try {
    const { sessionId } = req.body as { sessionId: string };

    const session = await getSession(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (!session.is_paid) {
      return res.status(403).json({ error: "Payment required" });
    }

    const dimScores = session.dim_scores as any;
    const petResult = session.pet_result;

    const report = await generatePetReport(petResult, dimScores);

    return res.json({
      reportId: sessionId,
      ...report,
    });
  } catch (error) {
    console.error("Error generating report:", error);
    return res.status(500).json({ error: "Failed to generate report" });
  }
});

// GET /api/report/:sessionId - Get generated report
app.get("/api/report/:sessionId", async (req, res) => {
  try {
    const { getReport } = await import("./services/supabase");
    const report = await getReport(req.params.sessionId);
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    return res.json(report);
  } catch (error) {
    console.error("Error getting report:", error);
    return res.status(500).json({ error: "Failed to get report" });
  }
});

// POST /api/pay/create - Create payment order (stub)
app.post("/api/pay/create", async (req, res) => {
  try {
    const { sessionId } = req.body as { sessionId: string };

    // TODO: Integrate WeChat Pay API
    return res.json({
      orderId: `stub_${Date.now()}`,
      sessionId,
      amount: 9.9,
      status: "pending",
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    return res.status(500).json({ error: "Failed to create payment" });
  }
});

// POST /api/pay/notify - Payment callback (stub)
app.post("/api/pay/notify", async (req, res) => {
  try {
    const { sessionId, status } = req.body as { sessionId: string; status: string };

    if (status === "success") {
      await updateSessionPaid(sessionId);
    }

    return res.json({ received: true });
  } catch (error) {
    console.error("Error processing payment callback:", error);
    return res.status(500).json({ error: "Failed to process callback" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
