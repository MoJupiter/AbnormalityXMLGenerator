import { Anthropic } from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// 現在のファイルのディレクトリを取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// .envファイルのパスを明示的に指定
dotenv.config({ path: resolve(__dirname, '../../.env') });

// APIキーが取得できているか確認
console.log('API Key loaded:', process.env.ANTHROPIC_API_KEY ? 'Yes' : 'No');

// anthropicクライアントをグローバルスコープで初期化
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function sendMessage() {
  try {
    // clientを使用してメッセージを送信
    const msg = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      temperature: 0,
      system: "短い詩でのみ応答してください。",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "なぜ海は塩辛いのですか？"
            }
          ]
        }
      ]
    });
    console.log('Response:', msg.content);
  } catch (error) {
    console.error('Error details:', error);
  }
}

// 関数を実行
sendMessage();