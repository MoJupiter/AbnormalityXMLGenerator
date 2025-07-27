import React, { useState, useEffect } from 'react';
import { Download, Plus, Trash2, Copy, FileCode, Settings, Monitor } from 'lucide-react';

export const AbnormalityGenerator = () => {
  const [abnormalityData, setAbnormalityData] = useState({
    name: '',
    nameEn: '',
    number: '',
    affinityMatrix: {
      instinct: ['普通', '普通', '普通', '普通', '普通'],
      insight: ['普通', '普通', '普通', '普通', '普通'],
      attachment: ['普通', '普通', '普通', '普通', '普通'],
      repression: ['普通', '普通', '普通', '普通', '普通']
    },
    managementMethods: [
      { id: 1, condition: '', effect: '', probability: '' }
    ]
  });

  const [generatedCode, setGeneratedCode] = useState('');
  const [activeTab, setActiveTab] = useState('input');

  const affinityLevels = ['最低', '悪い', '普通', '良い', '最高'];
  const levelColors = {
    '最低': 'bg-red-600',
    '悪い': 'bg-red-400',
    '普通': 'bg-yellow-400',
    '良い': 'bg-green-400',
    '最高': 'bg-green-600'
  };

  const updateAffinity = (type, level, value) => {
    setAbnormalityData(prev => ({
      ...prev,
      affinityMatrix: {
        ...prev.affinityMatrix,
        [type]: prev.affinityMatrix[type].map((item, idx) => 
          idx === level ? value : item
        )
      }
    }));
  };

  const addManagementMethod = () => {
    setAbnormalityData(prev => ({
      ...prev,
      managementMethods: [
        ...prev.managementMethods,
        { id: prev.managementMethods.length + 1, condition: '', effect: '', probability: '' }
      ]
    }));
  };

  const removeManagementMethod = (id) => {
    setAbnormalityData(prev => ({
      ...prev,
      managementMethods: prev.managementMethods.filter(method => method.id !== id)
    }));
  };

  const updateManagementMethod = (id, field, value) => {
    setAbnormalityData(prev => ({
      ...prev,
      managementMethods: prev.managementMethods.map(method =>
        method.id === id ? { ...method, [field]: value } : method
      )
    }));
  };

  const generateCode = () => {
    const { name, nameEn, number, affinityMatrix, managementMethods } = abnormalityData;
    
    if (!name || !nameEn) {
      alert('アブノーマリティ名（日本語・英語）を入力してください');
      return;
    }

    const code = `using System;
using System.Collections.Generic;
using UnityEngine;
using Spine;
using Spine.Unity;
using Assets.Scripts.UI.Utils;
using Event = Spine.Event;
using AnimationState = Spine.AnimationState;

namespace ${nameEn}Mod
{
    public class ${nameEn} : CreatureBase, IObserver
    {
        private ${nameEn}Anim animator;
        private Timer workTimer = new Timer();
        private List<WorkerModel> deadList = new List<WorkerModel>();
        private List<WorkerModel> panicList = new List<WorkerModel>();
        private bool isActivated = false;
        
        public override void OnEnterRoom(UseSkill skill)
        {
            base.OnEnterRoom(skill);
            this.animator = (base.Unit.animTarget as ${nameEn}Anim);
            this.animator.SetScript(this);
        }

        public override void OnReleaseWork(UseSkill skill)
        {
            base.OnReleaseWork(skill);
            this.animator.Default();
        }

        public override void OnFinishWork(UseSkill skill)
        {
            base.OnFinishWork(skill);
            CreatureFeelingState feeling = skill.GetCurrentFeelingState();
            
            ${managementMethods.map(method => `
            // 管理方法${method.id}
            if (${generateCondition(method.condition)})
            {
                ${generateEffect(method.effect, method.probability)}
            }`).join('')}
        }

        public override void OnFixedUpdateInSkill(UseSkill skill)
        {
            base.OnFixedUpdateInSkill(skill);
            
            // 作業中の処理
            if (skill.IsWorking())
            {
                // 特殊な作業処理をここに追加
            }
        }

        public override void OnNotice(string notice, params object[] param)
        {
            base.OnNotice(notice, param);
            
            if (notice == NoticeName.OnAgentDead)
            {
                if (param[0] is AgentModel agentModel && !this.deadList.Contains(agentModel))
                {
                    this.deadList.Add(agentModel);
                    // 職員死亡時の処理
                }
            }
            
            if (notice == NoticeName.OnAgentPanic)
            {
                if (param[0] is AgentModel agentModel && !this.panicList.Contains(agentModel))
                {
                    this.panicList.Add(agentModel);
                    // 職員パニック時の処理
                }
            }
        }

        public override void Escape()
        {
            base.Escape();
            this.animator.Moving();
            // 脱走時の処理
        }

        public override void OnReturn()
        {
            base.OnReturn();
            this.animator.Default();
        }

        public override void ActivateQliphothCounter()
        {
            base.ActivateQliphothCounter();
            // クリフォトカウンター発動時の処理
        }

        public override void OnSuppressed()
        {
            base.OnSuppressed();
            this.model.ResetQliphothCounter();
            this.animator.Default();
        }

        public override void OnStageStart()
        {
            base.OnStageStart();
            Notice.instance.Observe(NoticeName.OnAgentDead, this);
            Notice.instance.Observe(NoticeName.OnAgentPanic, this);
        }

        public override void OnStageRelease()
        {
            base.OnStageRelease();
            Notice.instance.Remove(NoticeName.OnAgentDead, this);
            Notice.instance.Remove(NoticeName.OnAgentPanic, this);
        }

        // ヘルパーメソッド
        private void HealAllAgentsInDepartment()
        {
            Sefira[] openedSefiraList = SefiraManager.instance.GetOpendSefiraList();
            foreach (Sefira sefira in openedSefiraList)
            {
                if (sefira.agentList.Contains(this.model.GetMovableNode().GetPassage().GetSefira()))
                {
                    foreach (AgentModel agent in sefira.agentList)
                    {
                        agent.mental = agent.maxMental;
                    }
                }
            }
        }

        private void DamageAllAgentsInDepartment(float damage, RwbpType type)
        {
            Sefira[] openedSefiraList = SefiraManager.instance.GetOpendSefiraList();
            foreach (Sefira sefira in openedSefiraList)
            {
                if (sefira.agentList.Contains(this.model.GetMovableNode().GetPassage().GetSefira()))
                {
                    foreach (AgentModel agent in sefira.agentList)
                    {
                        agent.TakeDamage(this.model, new DamageInfo(type, damage));
                    }
                }
            }
        }
    }

    public class ${nameEn}Anim : CreatureAnimScript
    {
        public ${nameEn} script;
        public SkeletonAnimation animator;

        public void SetScript(${nameEn} script)
        {
            this.script = script;
            this.animator = this.gameObject.GetComponent<SkeletonAnimation>();
            this.animator.AnimationState.SetAnimation(0, "Default", true);
        }

        public void Default()
        {
            this.animator.AnimationState.SetAnimation(0, "Default", true);
        }

        public void Moving()
        {
            this.animator.AnimationState.SetAnimation(0, "Move", true);
        }

        public void Attack()
        {
            TrackEntry trackEntry = this.animator.AnimationState.SetAnimation(0, "Attack", false);
            trackEntry.Complete += new Spine.AnimationState.TrackEntryDelegate(this.AttackEnd);
        }

        public void AttackEnd(TrackEntry trackEntry)
        {
            this.Default();
        }

        public override void PlayDeadMotion()
        {
            base.PlayDeadMotion();
            this.animator.AnimationState.SetAnimation(0, "Dead", false);
        }

        public override bool HasDeadMotion()
        {
            return true;
        }
    }
}`;

    setGeneratedCode(code);
    setActiveTab('code');
  };

  const generateCondition = (condition) => {
    // 条件文の生成ロジック
    if (condition.includes('作業結果が良い')) {
      return 'feeling == CreatureFeelingState.GOOD';
    } else if (condition.includes('作業結果が悪い')) {
      return 'feeling == CreatureFeelingState.BAD';
    } else if (condition.includes('洞察作業')) {
      return 'skill.skillTypeInfo.id == 2L';
    }
    return 'true';
  };

  const generateEffect = (effect, probability) => {
    let code = '';
    
    if (effect.includes('部門内の全ての職員のMPが回復')) {
      code += 'this.HealAllAgentsInDepartment();';
    }
    
    if (effect.includes('職員が死亡')) {
      code += `
                if (UnityEngine.Random.Range(0f, 100f) < ${probability || '100'}f)
                {
                    skill.agent.Die();
                }`;
    }
    
    if (effect.includes('体力が大きく回復')) {
      code += `
                if (UnityEngine.Random.Range(0f, 100f) < ${probability || '100'}f)
                {
                    // 体力回復処理
                }`;
    }
    
    return code;
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${abnormalityData.nameEn || 'Abnormality'}.cs`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('コードをクリップボードにコピーしました！');
  };

  const generateResourceList = () => {
    const { nameEn } = abnormalityData;
    return `必要なリソースファイル一覧:

アニメーションファイル:
- ${nameEn}_Default.json
- ${nameEn}_Move.json
- ${nameEn}_Attack.json
- ${nameEn}_Dead.json

サウンドファイル:
- SoundEffect/${nameEn}_attack.wav
- SoundEffect/${nameEn}_escape.wav

画像ファイル:
- Image/${nameEn}_work_icon.png
- Image/${nameEn}_buff_icon.png

設定ファイル:
- ${nameEn}_metadata.json`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      {/* Header */}
      <div className="bg-black border-b border-green-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Monitor className="w-8 h-8 text-green-400" />
            <h1 className="text-2xl font-bold text-green-400">
              ABNORMALITY PROGRAM GENERATOR
            </h1>
          </div>
          <div className="text-sm text-green-600">
            LOBOTOMY CORPORATION MOD DEVELOPMENT SYSTEM
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-800 border-b border-green-600">
        <div className="flex">
          <button
            onClick={() => setActiveTab('input')}
            className={`px-6 py-3 border-r border-green-600 transition-colors ${
              activeTab === 'input' 
                ? 'bg-green-600 text-black' 
                : 'hover:bg-gray-700 text-green-400'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            設定入力
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-6 py-3 border-r border-green-600 transition-colors ${
              activeTab === 'code' 
                ? 'bg-green-600 text-black' 
                : 'hover:bg-gray-700 text-green-400'
            }`}
          >
            <FileCode className="w-4 h-4 inline mr-2" />
            生成コード
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-6 py-3 transition-colors ${
              activeTab === 'resources' 
                ? 'bg-green-600 text-black' 
                : 'hover:bg-gray-700 text-green-400'
            }`}
          >
            <Download className="w-4 h-4 inline mr-2" />
            リソース
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {activeTab === 'input' && (
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-800 border border-green-600 rounded-lg p-6">
              <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                基本情報
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">
                    アブノーマリティ名（日本語）
                  </label>
                  <input
                    type="text"
                    value={abnormalityData.name}
                    onChange={(e) => setAbnormalityData(prev => ({...prev, name: e.target.value}))}
                    className="w-full px-3 py-2 bg-gray-700 border border-green-600 rounded text-green-400 focus:outline-none focus:border-green-400"
                    placeholder="人の消えた病棟"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">
                    アブノーマリティ名（英語）
                  </label>
                  <input
                    type="text"
                    value={abnormalityData.nameEn}
                    onChange={(e) => setAbnormalityData(prev => ({...prev, nameEn: e.target.value}))}
                    className="w-full px-3 py-2 bg-gray-700 border border-green-600 rounded text-green-400 focus:outline-none focus:border-green-400"
                    placeholder="EmptyWard"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-400 mb-2">
                    番号
                  </label>
                  <input
                    type="text"
                    value={abnormalityData.number}
                    onChange={(e) => setAbnormalityData(prev => ({...prev, number: e.target.value}))}
                    className="w-full px-3 py-2 bg-gray-700 border border-green-600 rounded text-green-400 focus:outline-none focus:border-green-400"
                    placeholder="O-06-448"
                  />
                </div>
              </div>
            </div>

            {/* Affinity Matrix */}
            <div className="bg-gray-800 border border-green-600 rounded-lg p-6">
              <h2 className="text-xl font-bold text-green-400 mb-4">管理好感度</h2>
              <div className="space-y-4">
                {Object.entries(abnormalityData.affinityMatrix).map(([type, levels]) => (
                  <div key={type} className="flex items-center space-x-4">
                    <div className="w-20 text-green-400 font-semibold">
                      {type === 'instinct' ? '本能' : 
                       type === 'insight' ? '洞察' : 
                       type === 'attachment' ? '愛着' : '抑圧'}
                    </div>
                    <div className="flex space-x-2">
                      {levels.map((level, idx) => (
                        <select
                          key={idx}
                          value={level}
                          onChange={(e) => updateAffinity(type, idx, e.target.value)}
                          className={`px-3 py-2 rounded text-black font-semibold ${levelColors[level]}`}
                        >
                          {affinityLevels.map(lvl => (
                            <option key={lvl} value={lvl}>{lvl}</option>
                          ))}
                        </select>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Management Methods */}
            <div className="bg-gray-800 border border-green-600 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-green-400">管理方法</h2>
                <button
                  onClick={addManagementMethod}
                  className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-500 transition-colors flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  追加
                </button>
              </div>
              <div className="space-y-4">
                {abnormalityData.managementMethods.map((method) => (
                  <div key={method.id} className="bg-gray-700 border border-green-600 rounded p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-green-400">
                        管理方法 {method.id}
                      </h3>
                      <button
                        onClick={() => removeManagementMethod(method.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-green-400 mb-1">
                          発動条件
                        </label>
                        <textarea
                          value={method.condition}
                          onChange={(e) => updateManagementMethod(method.id, 'condition', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-600 border border-green-600 rounded text-green-400 focus:outline-none focus:border-green-400"
                          rows={2}
                          placeholder="作業結果が良い の場合..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-green-400 mb-1">
                          効果
                        </label>
                        <textarea
                          value={method.effect}
                          onChange={(e) => updateManagementMethod(method.id, 'effect', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-600 border border-green-600 rounded text-green-400 focus:outline-none focus:border-green-400"
                          rows={3}
                          placeholder="部門内の全ての職員のMPが回復した。"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-green-400 mb-1">
                          確率（%）
                        </label>
                        <input
                          type="number"
                          value={method.probability}
                          onChange={(e) => updateManagementMethod(method.id, 'probability', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-600 border border-green-600 rounded text-green-400 focus:outline-none focus:border-green-400"
                          placeholder="30"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <button
                onClick={generateCode}
                className="bg-green-600 text-black px-8 py-3 rounded-lg hover:bg-green-500 transition-colors font-bold text-lg"
              >
                <FileCode className="w-5 h-5 inline mr-2" />
                プログラムを生成
              </button>
            </div>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="bg-gray-800 border border-green-600 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-green-400">生成されたC#コード</h2>
              <div className="flex space-x-2">
                <button
                  onClick={copyCode}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors flex items-center"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  コピー
                </button>
                <button
                  onClick={downloadCode}
                  className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-500 transition-colors flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  ダウンロード
                </button>
              </div>
            </div>
            <div className="bg-gray-900 border border-green-600 rounded p-4 overflow-auto max-h-96">
              <pre className="text-green-400 text-sm whitespace-pre-wrap">
                {generatedCode || 'コードを生成するには、設定入力タブで情報を入力して「プログラムを生成」ボタンを押してください。'}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="bg-gray-800 border border-green-600 rounded-lg p-6">
            <h2 className="text-xl font-bold text-green-400 mb-4">必要なリソースファイル</h2>
            <div className="bg-gray-900 border border-green-600 rounded p-4">
              <pre className="text-green-400 text-sm whitespace-pre-wrap">
                {generateResourceList()}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
