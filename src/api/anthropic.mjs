import { Anthropic } from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// ���݂̃t�@�C���̃f�B���N�g�����擾
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// .env�t�@�C���̃p�X�𖾎��I�Ɏw��
dotenv.config({ path: resolve(__dirname, '../../.env') });

// API�L�[���擾�ł��Ă��邩�m�F
console.log('API Key loaded:', process.env.ANTHROPIC_API_KEY ? 'Yes' : 'No');

// anthropic�N���C�A���g���O���[�o���X�R�[�v�ŏ�����
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function sendMessage() {
  try {
    // client���g�p���ă��b�Z�[�W�𑗐M
    const msg = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      temperature: 0,
      system: "�Z�����ł̂݉������Ă��������B",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "�Ȃ��C�͉��h���̂ł����H"
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

// �֐������s
sendMessage();