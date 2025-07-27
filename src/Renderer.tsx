import {DragEvent, FC, ReactNode, useState} from "react";
import {Abnormality, RWBP, RWBPInfomation, ObserveBonusType, Information, LiskLevel, Damage, ObserveBonus, Equipment, Gift} from './AbnormalityInterfaces'
import {handleArrayChange, handleArrayRemoveItem, handleArrayAddItem, handleRWBPChange, handleNestedObjectChange} from './HandleChange'

import Image from 'next/image';
type Props = {
  onDropFile: (file: File) => void;
  children: ReactNode;
};

const DropImageZone: FC<Props> = ({ onDropFile, children }) => {
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragActive(true);
    }
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    setIsDragActive(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragActive(false);

    if (e.dataTransfer.files !== null && e.dataTransfer.files.length > 0) {
      if (e.dataTransfer.files.length === 1) {
        onDropFile(e.dataTransfer.files[0]);
      } else {
        alert("ファイルは１個まで！");
      }
      e.dataTransfer.clearData();
    }
  };

  return (
    <div
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      // mergeはclassを合成する自作の関数
      // Dragが有効のときopacityを変更する
    >
      {children}
    </div>
  );
};

export const RenderFileInformationArray = (infoArray: Information[], path: string, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => {
  const [image, setImage] = useState<string | null>(null);
  

  const onDropFile = (file: File) => {
    if (file.type.substring(0, 5) !== "image") {
      alert("画像ファイルでないものはアップロードできません！");
    } else {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const imageSrc: string = fileReader.result as string;
        setImage(imageSrc);
      };
      fileReader.readAsDataURL(file);
    }
  };


 return(<div>
    {infoArray.map((info, index) => (
      <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
        <h4>情報 {index + 1}</h4>
        <label>
          Open Level:
          <input
            type="number"
            name="openLevel"
            value={info.openLevel}
            onChange={(e) => handleArrayChange(e, path, index, setAbnormality)}
          />
        </label>
        <br />
        <label>
          解放情報:
          {image ? (
            <Image
              src={image}
              width={403}
              height={598}
              alt="画像のプレビュー"
            />
          ) : (
            <DropImageZone onDropFile={onDropFile}>
              <div>
                <Image
                  src={"/file-upload.svg"}
                  width={24}
                  height={24}
                  alt="アップロードアイコン"
                />
              </div>
            </DropImageZone>
          )}
        </label>
        <br />
        <button type="button" onClick={() => handleArrayRemoveItem(path, index, setAbnormality)}>
          削除
        </button>
      </div>
    ))}
    <button type="button" onClick={() => handleArrayAddItem(path, setAbnormality)}>
      情報追加
    </button>
  </div>);
};
export const renderInformationArray = (infoArray: Information[], path: string, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => (
  <div>
    {infoArray.map((info, index) => (
      <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
        <h4>情報 {index + 1}</h4>
        <label>
          Open Level:
          <input
            type="number"
            name="openLevel"
            value={info.openLevel}
            onChange={(e) => handleArrayChange(e, path, index, setAbnormality)}
          />
        </label>
        <br />
        <label>
          解放情報:
          <input
            type="text"
            name="data"
            value={info.data}
            onChange={(e) => handleArrayChange(e, path, index, setAbnormality)}
          />
        </label>
        <br />
        <button type="button" onClick={() => handleArrayRemoveItem(path, index, setAbnormality)}>
          削除
        </button>
      </div>
    ))}
    <button type="button" onClick={() => handleArrayAddItem(path, setAbnormality)}>
      情報追加
    </button>
  </div>
);

export const renderLiskLevelArray = (liskLevelArray: LiskLevel[], path: string, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => (
  <div>
    {liskLevelArray.map((lisk, index) => (
      <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
        <h4>リスクレベル {index + 1}</h4>
        <label>
          Open Level:
          <input
            type="number"
            name="openLevel"
            value={lisk.openLevel}
            onChange={(e) => handleArrayChange(e, path, index, setAbnormality)}
          />
        </label>
        <br />
        <label>
          解放レベル:
          <input
            type="text"
            name="data"
            value={lisk.data}
            onChange={(e) => handleArrayChange(e, path, index, setAbnormality)}
          />
        </label>
        <br />
        <label>
          Level:
          <input
            type="number"
            name="level"
            value={lisk.level}
            onChange={(e) => handleArrayChange(e, path, index, setAbnormality)}
          />
        </label>
        <br />
        <button type="button" onClick={() => handleArrayRemoveItem(path, index, setAbnormality)}>
          削除
        </button>
      </div>
    ))}
    <button type="button" onClick={() => handleArrayAddItem(path, setAbnormality)}>
      リスクレベル追加
    </button>
  </div>
);

export const renderRWBPInfo = (rwbpInfo: RWBPInfomation, path: string, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => (
  <div style={{ border: '1px solid #eee', padding: '5px', margin: '5px 0' }}>
    <label>
      R:
      <input type="number" name="R" value={rwbpInfo.R} onChange={(e) => handleRWBPChange(e, path, setAbnormality)} />
    </label>
    <label>
      W:
      <input type="number" name="W" value={rwbpInfo.W} onChange={(e) => handleRWBPChange(e, path, setAbnormality)} />
    </label>
    <label>
      B:
      <input type="number" name="B" value={rwbpInfo.B} onChange={(e) => handleRWBPChange(e, path, setAbnormality)} />
    </label>
    <label>
      P:
      <input type="number" name="P" value={rwbpInfo.P} onChange={(e) => handleRWBPChange(e, path, setAbnormality)} />
    </label>
  </div>
);

export const renderDamage = (damage: Damage, path: string, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>, index?: number) => (
  <div style={{ border: '1px solid #eee', padding: '5px', margin: '5px 0' }}>
    <label>
      Type:
      <select
        name="type"
        value={damage.type}
        onChange={(e) => index !== undefined ? handleArrayChange(e, path, index, setAbnormality) : handleNestedObjectChange(e, path, setAbnormality)}
      >
        {Object.values(RWBP).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </label>
    <label>
      Min:
      <input
        type="number"
        name="min"
        value={damage.min}
        onChange={(e) => index !== undefined ? handleArrayChange(e, path, index, setAbnormality) : handleNestedObjectChange(e, path, setAbnormality)}
      />
    </label>
    <label>
      Max:
      <input
        type="number"
        name="max"
        value={damage.max}
        onChange={(e) => index !== undefined ? handleArrayChange(e, path, index, setAbnormality) : handleNestedObjectChange(e, path, setAbnormality)}
      />
    </label>
  </div>
);

export const renderObserveBonusArray = (observeBonusArray: ObserveBonus[], path: string, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => (
  <div>
    {observeBonusArray.map((bonus, index) => (
      <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px 0' }}>
        <h4>観測ボーナス {index + 1}</h4>
        <label>
          Type:
          <select
            name="type"
            value={bonus.type}
            onChange={(e) => handleArrayChange(e, path, index, setAbnormality)}
          >
            {Object.values(ObserveBonusType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          観測ボーナス量(%):
          <input
            type="number"
            name="data"
            value={bonus.data}
            onChange={(e) => handleArrayChange(e, path, index, setAbnormality)}
          />
        </label>
        <br />
        <label>
          Level:
          <input
            type="number"
            name="level"
            value={bonus.level}
            onChange={(e) => handleArrayChange(e, path, index, setAbnormality)}
          />
        </label>
        <br />
      </div>
    ))}
  </div>
);

export const renderEquipment = (equipment: Equipment, path: string, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => (
  <div style={{ border: '1px solid #eee', padding: '5px', margin: '5px 0' }}>
    <label>
      ID:
      <input type="number" name="id" value={equipment.id} onChange={(e) => handleNestedObjectChange(e, path, setAbnormality)} />
    </label>
    <label>
      Level:
      <input type="number" name="level" value={equipment.level} onChange={(e) => handleNestedObjectChange(e, path, setAbnormality)} />
    </label>
    <label>
      Cost:
      <input type="number" name="cost" value={equipment.cost} onChange={(e) => handleNestedObjectChange(e, path, setAbnormality)} />
    </label>
  </div>
);

export const renderGift = (gift: Gift, path: string,  setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => (
  <div style={{ border: '1px solid #eee', padding: '5px', margin: '5px 0' }}>
    <label>
      ID:
      <input type="number" name="id" value={gift.id} onChange={(e) => handleNestedObjectChange(e, path, setAbnormality)} />
    </label>
    <label>
      Level:
      <input type="number" name="level" value={gift.level} onChange={(e) => handleNestedObjectChange(e, path, setAbnormality)} />
    </label>
    <label>
      Prob:
      <input type="number" name="prob" value={gift.prob} onChange={(e) => handleNestedObjectChange(e, path, setAbnormality)} />
    </label>
  </div>
);