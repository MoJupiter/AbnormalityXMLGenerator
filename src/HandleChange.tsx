import {Abnormality, RWBP, RWBPInfomation, ObserveBonusType, Information, LiskLevel, Damage, ObserveBonus, Equipment, Gift} from './AbnormalityInterfaces'

export const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, path: string, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => {
  const { value, type, checked, name } = e.target as HTMLInputElement;
  const newValue = type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value);

  setAbnormality(prevAbnormality => {
    const updatedAbnormality = { ...prevAbnormality };
    let current: any = updatedAbnormality;
    const pathParts = path.split('.');

    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      if (Array.isArray(current[part])) {
          const index = parseInt(pathParts[i+1]);
          current = current[part][index];
          i++; // Skip next part as it's the index
      } else {
          current = current[part];
      }
    }

    const lastPart = pathParts[pathParts.length - 1];
    if (Array.isArray(current)) { // For arrays like narration, specialDamage etc.
        const index = parseInt(lastPart);
        current[index] = newValue;
    } else {
        current[lastPart] = newValue;
    }
    return updatedAbnormality;
  });
};

export const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, path: string, index: number, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => {
  const { value, type, checked, name } = e.target as HTMLInputElement;
  const newValue = type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value);

  setAbnormality(prevAbnormality => {
      const updatedAbnormality = { ...prevAbnormality };
      let current: any = updatedAbnormality;
      const pathParts = path.split('.');

      for (let i = 0; i < pathParts.length - 1; i++) {
          current = current[pathParts[i]];
      }

      current[pathParts[pathParts.length - 1]][index] = {...current[pathParts[pathParts.length - 1]][index],[name]: newValue};
      return updatedAbnormality;
  });
};

export const handleNestedObjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, parentPath: string, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => {
  const { name, value, type, checked } = e.target as HTMLInputElement;
  const newValue = type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value);

  setAbnormality(prevAbnormality => {
      const updatedAbnormality = { ...prevAbnormality };
      let current: any = updatedAbnormality;
      const pathParts = parentPath.split('.');
      for (const part of pathParts) {
          current = current[part];
      }
      current[name] = newValue;
      return updatedAbnormality;
  });
};

export const handleRWBPChange = (e: React.ChangeEvent<HTMLInputElement>, path: string, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => {
  const { name, value } = e.target;
  setAbnormality(prevAbnormality => {
    const updatedAbnormality = { ...prevAbnormality };
    let current: any = updatedAbnormality;
    const pathParts = path.split('.');
    for (const part of pathParts) {
      current = current[part];
    }
    current[name as keyof RWBPInfomation] = parseFloat(value);
    return updatedAbnormality;
  });
};

export const handleArrayAddItem = (path: string, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => {
setAbnormality(prevAbnormality => {

  const updatedAbnormality = structuredClone(prevAbnormality); // ディープコピー
  let current: any = updatedAbnormality;
  const pathParts = path.split('.');

  for (let i = 0; i < pathParts.length - 1; i++) {
    current = current[pathParts[i]];
  }
  const arrayName = pathParts[pathParts.length - 1];

  let newItem: any;
  switch (arrayName) {
    case 'codeNo':
    case 'name':
    case 'portrait':
    case 'openText':
    case 'desc':
      newItem = { openLevel: 1, data: '' };
      break;
    case 'riskLevel':
      newItem = { openLevel: 1, data: '', level: 1 };
      break;
    case 'specialTips':
      newItem = { data: { openLevel: 1, data: '' }, cost: 1 };
      break;
    case 'narration':
      newItem = '';
      break;
    case 'observeBonus':
      newItem = { type: 'prob', data: 1, level: 1 };
      break;
    case 'specialDamage':
      newItem = { type: 'R', min: 1, max: 1 };
      break;
    default:
      console.warn('未対応のarrayName:', arrayName);
      return prevAbnormality;
  }

  current[arrayName] = [...current[arrayName], newItem];
  return updatedAbnormality;
});
};

export const handleArrayRemoveItem = (path: string, index: number, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => {
  setAbnormality(prevAbnormality => {
  const updatedAbnormality = structuredClone(prevAbnormality); // ディープコピー

  let current: any = updatedAbnormality;
  const pathParts = path.split('.');
  for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]];
  }
  const arrayName = pathParts[pathParts.length - 1];

  if (Array.isArray(current[arrayName])) {
      current[arrayName] = current[arrayName].filter((_: any, i: number) => i !== index);
  } else {
      console.warn('削除対象が配列ではありません:', current[arrayName]);
  }

  return updatedAbnormality;
  });
};
