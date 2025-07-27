import Conver2XML from "./Conver2XML";
import handleDownload from "./HandleDownload";
import {Abnormality} from './AbnormalityInterfaces'

import {handleChange, handleArrayChange, handleArrayRemoveItem, handleArrayAddItem} from "./HandleChange";
import {renderInformationArray, renderLiskLevelArray, renderRWBPInfo, renderDamage, renderObserveBonusArray, renderEquipment, renderGift} from "./Renderer";

const EscapeInfoForm = (abnormality: Abnormality, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => {
    return(
      <form>
        
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
export default EscapeInfoForm;