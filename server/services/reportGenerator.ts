import type { DimScores } from "../data/questions";

export interface GeneratedReport {
  typeName: string;
  whyFit: string;
  dailyScene: string;
  reminder: string;
  keywords: string[];
}

export async function generatePetReport(
  petResult: string,
  dimScores: DimScores
): Promise<GeneratedReport> {
  const A_scores = JSON.stringify(dimScores.A);
  const B_scores = JSON.stringify(dimScores.B);
  const C_scores = JSON.stringify(dimScores.C);
  const D_scores = JSON.stringify(dimScores.D);

  const prompt = `你是一位温柔且有洞察力的宠物缘分分析师。
根据用户的测试结果，生成一份让他/她感到「说中了我」的宠物匹配报告。

用户最匹配的宠物：${petResult}
四维测试得分分布：
- 生活方式（A维）各宠物得分：${A_scores}
- 情感需求（B维）各宠物得分：${B_scores}
- 性格特质（C维）各宠物得分：${C_scores}
- 隐性偏好（D维）各宠物得分：${D_scores}

请严格按以下 JSON 格式输出，不要输出任何其他内容：
{
  "typeName": "4-10个字的缘分类型名，有诗意，不要太普通",
  "whyFit": "为什么${petResult}最适合你，结合得分特征说具体，2-3句，不要泛泛而谈",
  "dailyScene": "描述你和${petResult}在一起的一个有画面感的日常瞬间，2-3句",
  "reminder": "养${petResult}需要注意的一件最重要的事，1-2句，温柔但直接",
  "keywords": ["关键词1", "关键词2", "关键词3"]
}

要求：
- 口吻温暖、有共鸣感，像一个懂你的朋友在说话
- keywords 要像性格标签，用户愿意展示在分享卡片上
- 不要说废话，每句话都有信息量
- 全程用中文`;

  const response = await fetch("https://api.minimax.chat/v1/text/chatcompletion_v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.MINIMAX_API_KEY}`,
    },
    body: JSON.stringify({
      model: "MiniMax-Text-01",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_object",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`MiniMax API error: ${response.status} ${errorText}`);
  }

  const data = await response.json() as {
    choices?: Array<{ messages: string }>;
    errors?: string[];
  };

  const reply = data.choices?.[0]?.messages ?? data.errors?.[0] ?? '{}';
  const parsed = JSON.parse(reply);

  return {
    typeName: parsed.typeName ?? "缘分未名",
    whyFit: parsed.whyFit ?? "",
    dailyScene: parsed.dailyScene ?? "",
    reminder: parsed.reminder ?? "",
    keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
  };
}
