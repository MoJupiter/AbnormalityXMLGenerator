import Conver2XML from "./Conver2XML";
import handleDownload from "./HandleDownload";
import {Abnormality} from './AbnormalityInterfaces'

import {handleChange, handleArrayChange, handleArrayRemoveItem, handleArrayAddItem} from "./HandleChange";
import {renderInformationArray, renderLiskLevelArray, renderRWBPInfo, renderDamage, renderObserveBonusArray, renderEquipment, renderGift} from "./Renderer";

const SkillInfoForm = (abnormality: Abnormality, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => {
    return(
      <form>
        
        {/* Skill Information */}
        <div style={{ border: '1px solid #000', padding: '15px', marginBottom: '20px' }}>
          <h2>スキル情報 (Skill Information)</h2>
          <h3>作業成功率 (Work Prob)</h3>
          <h4>Open Cost</h4>
            <input
            type="number"
            name="openLevel"
            value={abnormality.skillInfo.workProb.openCost}
            onChange={(e) => handleChange(e, 'skillInfo.workProb.openCost', setAbnormality)}
            />
          <h4>Level 1</h4>
          {renderRWBPInfo(abnormality.skillInfo.workProb.Level1, 'skillInfo.workProb.Level1', setAbnormality)}
          <h4>Level 2</h4>
          {renderRWBPInfo(abnormality.skillInfo.workProb.Level2, 'skillInfo.workProb.Level2', setAbnormality)}
          <h4>Level 3</h4>
          {renderRWBPInfo(abnormality.skillInfo.workProb.Level3, 'skillInfo.workProb.Level3', setAbnormality)}
          <h4>Level 4</h4>
          {renderRWBPInfo(abnormality.skillInfo.workProb.Level4, 'skillInfo.workProb.Level4', setAbnormality)}
          <h4>Level 5</h4>
          {renderRWBPInfo(abnormality.skillInfo.workProb.Level5, 'skillInfo.workProb.Level5', setAbnormality)}

          <label>
            開始ナレーション (Narration Start):
            <textarea value={abnormality.skillInfo.narration_start} onChange={(e) => handleChange(e, 'skillInfo.narration_start', setAbnormality)} rows={3} cols={50} />
          </label>
          <br />
          <label>
            移動ナレーション (Narration Move):
            <textarea value={abnormality.skillInfo.narration_move} onChange={(e) => handleChange(e, 'skillInfo.narration_move', setAbnormality)} rows={3} cols={50} />
          </label>
          <br />

          <h3>ナレーション (Narration)</h3>
          <div>
            {abnormality.skillInfo.narration.map((nar, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
                <label>
                  ナレーション {index + 1}:
                  <textarea
                    value={nar.data}
                    name="data"
                    onChange={(e) => {handleArrayChange(e, `skillInfo.narration`, index, setAbnormality)}}
                    rows={3}
                    cols={50}
                  />
                </label>
                <br />
                <button type="button" onClick={() => handleArrayRemoveItem('skillInfo.narration', index, setAbnormality)}>
                  削除
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleArrayAddItem('skillInfo.narration', setAbnormality)}>
              ナレーション追加
            </button>
          </div>
          <br />

          <label>
            クリフォトカウンター (Qliphoth Counter):
            <input type="number" value={abnormality.skillInfo.qliphoth} onChange={(e) => handleChange(e, 'skillInfo.qliphoth', setAbnormality)} />
          </label>
          <br />

          <h3>感情状態キューブ境界 (Feeling State Cube Bounds)</h3>
          <label>
            Bad:
            <input type="number" value={abnormality.skillInfo.feelingStateCubeBounds.bad} onChange={(e) => handleChange(e, 'skillInfo.feelingStateCubeBounds.bad', setAbnormality)} name="bad" />
          </label>
          <label>
            Norm:
            <input type="number" value={abnormality.skillInfo.feelingStateCubeBounds.norm} onChange={(e) => handleChange(e, 'skillInfo.feelingStateCubeBounds.norm', setAbnormality)} name="norm" />
          </label>
          <label>
            Good:
            <input type="number" value={abnormality.skillInfo.feelingStateCubeBounds.good} onChange={(e) => handleChange(e, 'skillInfo.feelingStateCubeBounds.good', setAbnormality)} name="good" />
          </label>
          <br />

          <label>
            作業速度 (Work Speed):
            <input type="number" value={abnormality.skillInfo.workSpeed} onChange={(e) => handleChange(e, 'skillInfo.workSpeed', setAbnormality)} />
          </label>
          <br />

          <h3>作業ダメージ (Work Damage)</h3>
          {renderDamage(abnormality.skillInfo.workDamage, 'skillInfo.workDamage', setAbnormality)}
          <br />

          <label>
            作業クールタイム (Work Cooltime):
            <input type="number" value={abnormality.skillInfo.workCooltime} onChange={(e) => handleChange(e, 'skillInfo.workCooltime', setAbnormality)} />
          </label>
          <br />

          <h3>観測ボーナス (Observe Bonus)</h3>
          {renderObserveBonusArray(abnormality.skillInfo.observeBonus, 'skillInfo.observeBonus', setAbnormality)}
          <br />

          <h3>防具 (Armor)</h3>
          {renderEquipment(abnormality.skillInfo.armor, 'skillInfo.armor', setAbnormality)}
          <br />

          <h3>武器 (Weapon)</h3>
          {renderEquipment(abnormality.skillInfo.weapon, 'skillInfo.weapon', setAbnormality)}
          <br />

          <h3>ギフト (Gift)</h3>
          {renderGift(abnormality.skillInfo.gift, 'skillInfo.gift', setAbnormality)}
        </div>

        {/* Escape Information */}
        <div style={{ border: '1px solid #000', padding: '15px', marginBottom: '20px' }}>
          <h2>脱走情報 (Escape Information)</h2>
          <label>
            脱走可能 (Escapable):
            <input type="checkbox" checked={abnormality.escapeInfo.escapable} onChange={(e) => handleChange(e, 'escapeInfo.escapable', setAbnormality)} />
          </label>
          <br />

          <h3>防御 (Defense)</h3>
          <h4>データ</h4>
          {renderRWBPInfo(abnormality.escapeInfo.defense.data, 'escapeInfo.defense.data', setAbnormality)}
          <label>
            コスト:
            <input type="number" value={abnormality.escapeInfo.defense.cost} onChange={(e) => handleChange(e, 'escapeInfo.defense.cost', setAbnormality)} />
          </label>
          <br />

          <h3>特殊ダメージ (Special Damage)</h3>
          <div>
            {abnormality.escapeInfo.specialDamage.map((damage, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
                <h4>特殊ダメージ {index + 1}</h4>
                {renderDamage(damage, `escapeInfo.specialDamage`, setAbnormality, index)}
                <button type="button" onClick={() => handleArrayRemoveItem('escapeInfo.specialDamage', index, setAbnormality)}>
                  削除
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleArrayAddItem('escapeInfo.specialDamage', setAbnormality)}>
              特殊ダメージ追加
            </button>
          </div>
          <br />

          <label>
            HP:
            <input type="number" value={abnormality.escapeInfo.HP} onChange={(e) => handleChange(e, 'escapeInfo.HP', setAbnormality)} />
          </label>
          <br />
          <label>
            速度 (Speed):
            <input type="number" value={abnormality.escapeInfo.speed} onChange={(e) => handleChange(e, 'escapeInfo.speed', setAbnormality)} />
          </label>
          <br />
        </div>
      </form>

    );
};
export default SkillInfoForm;