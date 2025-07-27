
import React, { useState, useEffect } from 'react';
import {Abnormality, initialAbnormality} from './AbnormalityInterfaces'
import BasicInfoForm from './BasicInfoForm'
import SkillInfoForm from './SkillInfoForm'
import EscapeInfoForm from './EscapeInfoForm'
import ExportData from './ExportData'
import './Abnormality.css';

const AbnormalityForm: React.FC = () => {
  const [abnormality, setAbnormality] = useState<Abnormality>(initialAbnormality);

  const [currentPage, setCurrentPage] = useState('BasicInfo');
  const renderPage = () => {
    switch(currentPage){
      case 'BasicInfo' : 
      return BasicInfoForm(abnormality, setAbnormality);break;
      case 'SkillInfoForm' : 
      return SkillInfoForm(abnormality, setAbnormality);break;
      case 'EscapeInfoForm' : 
      return EscapeInfoForm(abnormality, setAbnormality);break;
      case 'Result' : 
      return ExportData(abnormality, setAbnormality);break;
    }
    return BasicInfoForm(abnormality, setAbnormality);
  }
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Abnormality 情報設定</h1>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        {Navigation(currentPage, setCurrentPage)}
        <form>
          {renderPage()}
        </form>
        <hr />
      </div>
      
    </div>
  );
};

const Navigation = (currentPage:string, setCurrentPage:React.Dispatch<React.SetStateAction<string>>) =>{
  const menuItems = [
    { id: 'BasicInfoForm', label: '基本情報' },
    { id: 'SkillInfoForm', label: '作業情報' },
    { id: 'EscapeInfoForm', label: '脱走情報' },
    { id: 'Result', label: '出力結果' }
  ];
  return(
    <nav className="bg-blue-600 text-white p-4">
      
      <div className="container mx-auto">
        <ul className="flex space-x-6">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`hover:text-blue-200 transition-colors px-3 py-1 rounded ${
                  currentPage === item.id 
                    ? 'bg-blue-800 text-yellow-300 font-bold' 
                    : 'hover:bg-blue-700'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )

}
interface PageInfo{
  currentPage: string;
  setCurrentPage: string;
}
interface MenuItem{
  id: string;
  label: string;
}
export default AbnormalityForm;