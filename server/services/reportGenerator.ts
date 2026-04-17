import type { DimScores } from "../data/questions";

export interface GeneratedReport {
  typeName: string;       // 缘分类型名
  whyFit: string;          // 为什么适合你
  dailyScene: string;      // 日常场景
  reminder: string;       // 养宠提醒
  keywords: string[];     // 铲屎官人格关键词
  personalityBase: string; // 性格底色
  prophecy: string;        // 契合预言
}

// Gemini API key for fallback
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyDSGCxAss02F1D711jBg5REzz14Z_k5FyY";
const PET_NAMES: Record<string, string> = {
  dog: "狗",
  cat: "猫",
  rabbit: "兔子",
  small: "小型宠物",
  fish: "鱼/爬行类",
  bird: "鸟",
};

// 计算总分用于分析
function calcTotals(dimScores: DimScores) {
  return {
    dog: dimScores.A.dog + dimScores.B.dog + dimScores.C.dog + dimScores.D.dog,
    cat: dimScores.A.cat + dimScores.B.cat + dimScores.C.cat + dimScores.D.cat,
    rabbit: dimScores.A.rabbit + dimScores.B.rabbit + dimScores.C.rabbit + dimScores.D.rabbit,
    small: dimScores.A.small + dimScores.B.small + dimScores.C.small + dimScores.D.small,
    fish: dimScores.A.fish + dimScores.B.fish + dimScores.C.fish + dimScores.D.fish,
    bird: dimScores.A.bird + dimScores.B.bird + dimScores.C.bird + dimScores.D.bird,
  };
}

// 分析得分特征，用于个性化 Prompt
function analyzeTraits(pet: string, dimScores: DimScores) {
  const totals = calcTotals(dimScores);
  const a = dimScores.A[pet as keyof typeof dimScores.A];
  const b = dimScores.B[pet as keyof typeof dimScores.B];
  const c = dimScores.C[pet as keyof typeof dimScores.C];
  const d = dimScores.D[pet as keyof typeof dimScores.D];

  const traits: string[] = [];

  // A维度分析（生活方式）
  if (a >= 10) traits.push("生活习惯非常规律有序");
  else if (a >= 7) traits.push("生活方式节奏适中");
  else if (a <= 4) traits.push("喜欢随性自在的生活节奏");

  // B维度分析（情感需求）
  if (b >= 8) traits.push("情感需求较高，渴望深度陪伴");
  else if (b >= 5) traits.push("需要适度的情感交流");
  else traits.push("情感上相对独立，不强求亲密");

  // C维度分析（性格特质）
  if (c >= 10) traits.push("性格坚韧有毅力，能坚持");
  else if (c >= 6) traits.push("性格温和有耐心");
  else traits.push("性格随和，不喜欢给自己压力");

  // D维度分析（隐性偏好）
  if (d >= 10) traits.push("对宠物有很深的精神期待");
  else if (d >= 6) traits.push("对养宠持理性开放态度");
  else traits.push("对宠物陪伴的需求比较淡薄");

  return traits.join("，");
}

export async function generatePetReport(
  petResult: string,
  dimScores: DimScores
): Promise<GeneratedReport> {
  const petName = PET_NAMES[petResult] || petResult;
  const traits = analyzeTraits(petResult, dimScores);

  const A_scores = JSON.stringify(dimScores.A);
  const B_scores = JSON.stringify(dimScores.B);
  const C_scores = JSON.stringify(dimScores.C);
  const D_scores = JSON.stringify(dimScores.D);
  const totals = calcTotals(dimScores);

  const prompt = `你是「你的宠物缘分」平台的宠物缘分分析师，名叫小缘。

你的任务是根据用户的测试数据，生成一份**极具共鸣感、让人惊叹"说中了我"**的宠物缘分报告。

## 用户数据
- 匹配宠物：${petName}（${petResult}）
- 生活方式（A维）各宠物得分：${A_scores}
- 情感需求（B维）各宠物得分：${B_scores}
- 性格特质（C维）各宠物得分：${C_scores}
- 隐性偏好（D维）各宠物得分：${D_scores}
- 你的${petName}总得分：${totals[petResult]}分
- 用户性格特征：${traits}

## 报告要求
请严格按以下JSON格式输出**所有字段**，全程用中文，语气温暖像朋友说话，有画面感，有洞察力：

{
  "typeName": "4-10字的缘分类型名，要有诗意有画面感，比如「独行侠的温柔港湾」或「晨曦里的忠诚伴侣」，不要平庸",
  "whyFit": "分3段深入分析为什么${petName}最适合这个用户。第一段：从${petName}的角度出发描述它的性格；第二段：结合用户的四个维度得分，说出你们契合的深层原因；第三段：给出一个让人动容的情感共鸣金句。整体要有说服力，不要泛泛而谈。",
  "dailyScene": "描述一个极具画面感的日常瞬间，用户和${petName}在一起。不需要华丽的辞藻，要真实、有温度、让人想起自己的生活。可以是：一起看日落、它蹭腿要抱、一起窝在沙发上、遛弯时的默契等。2-3句话，要有感官细节（声音/气味/触感）",
  "reminder": "养${petName}最重要的一件事提醒，要有针对性。根据用户得分，如果是独立型宠物的得分者，要提醒不要忽视它；如果是高情感需求的用户，要提醒不要把自己的期待强加给它。温柔但直接，1-2句话，像朋友给你的一句忠告。",
  "keywords": "3个性格标签词，每个2-4字，要像用户愿意展示在社交媒体上的个性签名，比如「内心柔软」「边界分明」「自在如风」",
  "personalityBase": "用2-3句话描述这个用户的「性格底色」，要精准。比如：「你是一个外冷内热的人，表面独立，内心却有柔软的地方渴望被理解。你习惯用距离保护自己，却在信任的人面前会展露最真实的自己。」要有心理学质感。",
  "prophecy": "用2-3句话描述一段「契合预言」，从${petName}的角度出发，描述你们未来相处中会有的一个深刻瞬间，像一个温柔的预言。比如：「某一天你会发现，${petName}总能在你最低落的时候，用它自己的方式默默陪伴你，那一刻你会明白，你们是彼此生命中的礼物。」要有仪式感和宿命感。"
}

## 写作风格要求
- 避免所有AI味、模板感
- 每一句话都要有具体信息量，不要废话
- 用「你」称呼用户，像懂他的朋友在说话
- 描写要有感官细节（颜色/声音/触感/气味）
- 整体情感温度：中偏高，既温暖治愈又不煽情

请直接输出JSON，不要有其他内容。`;

  // ========== 优先尝试 Gemini (更稳定) ==========
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json", maxOutputTokens: 2000 },
          }),
        }
      );

      if (!geminiResponse.ok) {
        const errText = await geminiResponse.text();
        if (geminiResponse.status === 503 && attempt < 3) {
          console.log(`Gemini overloaded (attempt ${attempt}/3), retrying in 3s...`);
          await new Promise(r => setTimeout(r, 3000));
          continue;
        }
        throw new Error(`Gemini API error: ${geminiResponse.status} ${errText}`);
      }

      const geminiData = await geminiResponse.json() as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };

      const geminiReply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
      const parsed = JSON.parse(parseJsonReply(geminiReply));

      return {
        typeName: parsed.typeName ?? "缘分待续",
        whyFit: parsed.whyFit ?? "",
        dailyScene: parsed.dailyScene ?? "",
        reminder: parsed.reminder ?? "",
        keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
        personalityBase: parsed.personalityBase ?? "",
        prophecy: parsed.prophecy ?? "",
      };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < 3) {
        console.log(`Gemini attempt ${attempt} failed, retrying...`);
        await new Promise(r => setTimeout(r, 3000));
      }
    }
  }

  // ========== Gemini 失败，尝试 MiniMax (备用) ==========
  console.log("Gemini failed, falling back to MiniMax...");

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetch("https://api.minimax.chat/v1/text/chatcompletion_v2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.MINIMAX_API_KEY}`,
        },
        body: JSON.stringify({
          model: "MiniMax-M2.7",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 2000,
          temperature: 0.8,
          response_format: { type: "json_object" },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 529 && attempt < 3) {
          console.log(`MiniMax overloaded (attempt ${attempt}/3), retrying in 3s...`);
          await new Promise(r => setTimeout(r, 3000));
          continue;
        }
        throw new Error(`MiniMax API error: ${response.status} ${errorText}`);
      }

      const data = await response.json() as {
        choices?: Array<{ message?: { content?: string } }>;
      };

      const reply = data.choices?.[0]?.message?.content ?? "{}";
      const parsed = JSON.parse(parseJsonReply(reply));

      return {
        typeName: parsed.typeName ?? "缘分待续",
        whyFit: parsed.whyFit ?? "",
        dailyScene: parsed.dailyScene ?? "",
        reminder: parsed.reminder ?? "",
        keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
        personalityBase: parsed.personalityBase ?? "",
        prophecy: parsed.prophecy ?? "",
      };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (attempt < 3) {
        console.log(`MiniMax attempt ${attempt} failed, retrying...`);
        await new Promise(r => setTimeout(r, 3000));
      }
    }
  }

  throw lastError || new Error("All AI providers failed");
}

// 解析 JSON 字符串，去掉 markdown 代码块标记
function parseJsonReply(reply: string): string {
  let clean = reply.trim();
  if (clean.startsWith("```json")) clean = clean.slice(7);
  else if (clean.startsWith("```")) clean = clean.slice(3);
  if (clean.endsWith("```")) clean = clean.slice(0, -3);
  return clean.trim();
}
