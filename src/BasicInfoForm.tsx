import {Abnormality} from './AbnormalityInterfaces'
import {handleChange, handleArrayChange, handleArrayRemoveItem, handleArrayAddItem} from "./HandleChange";
import { RenderFileInformationArray, renderInformationArray, renderLiskLevelArray, renderRWBPInfo, renderDamage, renderObserveBonusArray, renderEquipment, renderGift} from "./Renderer";
const BasicInfoForm = (abnormality: Abnormality, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => {
    return(
      <form>
        
        {/* Basic Information */}
        <div style={{ border: '1px solid #000', padding: '15px', marginBottom: '20px' }}>
          <h2>基本情報 (Basic Information)</h2>
          <label>
            ID:
            <input type="number" value={abnormality.basicInfo.id} onChange={(e) => handleChange(e, 'basicInfo.id', setAbnormality)} />
          </label>
          <br />
          <label>
            英語名 (Name EN):
            <input type="text" value={abnormality.basicInfo.name_en} onChange={(e) => handleChange(e, 'basicInfo.name_en', setAbnormality)} />
          </label>
          <br />
          <label>
            日本語名 (Name JA):
            <input type="text" value={abnormality.basicInfo.name_ja} onChange={(e) => handleChange(e, 'basicInfo.name_ja', setAbnormality)} />
          </label>
          <br />

          <h3>Code No.</h3>
          {renderInformationArray(abnormality.basicInfo.codeNo, 'basicInfo.codeNo', setAbnormality)}
          <br />

          <h3>名前 (Name)</h3>
          {renderInformationArray(abnormality.basicInfo.name, 'basicInfo.name', setAbnormality)}
          <br />

          <h3>肖像 (Portrait)</h3>
          {renderInformationArray(abnormality.basicInfo.portrait, 'basicInfo.portrait', setAbnormality)}
          <br />

          <h3>リスクレベル (Risk Level)</h3>
          {renderLiskLevelArray(abnormality.basicInfo.riskLevel, 'basicInfo.riskLevel', setAbnormality)}
          <br />

          <h3>解放テキスト (Open Text)</h3>
          {renderInformationArray(abnormality.basicInfo.openText, 'basicInfo.openText', setAbnormality)}
          <br />

          <h3>説明 (Description)</h3>
          {renderInformationArray(abnormality.basicInfo.desc, 'basicInfo.desc', setAbnormality)}
          <br />

          <h3>特殊ヒント (Special Tips)</h3>
          <div>
            {abnormality.basicInfo.specialTips.map((tip, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
                <h4>特殊ヒント {index + 1}</h4>
                <label>
                  Open Level:
                  <input
                    type="number"
                    name="openLevel"
                    value={tip.openLevel}
                    onChange={(e) => handleArrayChange(e, `basicInfo.specialTips`, index, setAbnormality)}
                  />
                </label>
                <br />
                <label>
                  Data:
                  <input
                    type="text"
                    name="data"
                    value={tip.data}
                    onChange={(e) => handleArrayChange(e, `basicInfo.specialTips`, index, setAbnormality)}
                  />
                </label>
                <br />
                <label>
                  Cost:
                  <input
                    type="number"
                    name="cost"
                    value={tip.cost}
                    onChange={(e) => handleArrayChange(e, `basicInfo.specialTips`, index, setAbnormality)}
                  />
                </label>
                <br />
                <button type="button" onClick={() => handleArrayRemoveItem('basicInfo.specialTips', index, setAbnormality)}>
                  削除
                </button>
              </div>
            ))}
            <button type="button" onClick={() => handleArrayAddItem('basicInfo.specialTips', setAbnormality)}>
              特殊ヒント追加
            </button>
          </div>
        </div>

        
      </form>

    );
};
export default BasicInfoForm;