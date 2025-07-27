import Conver2XML from "./Conver2XML";
import handleDownload from "./HandleDownload";
import {Abnormality} from './AbnormalityInterfaces'
const ExportData = (abnormality: Abnormality, setAbnormality:React.Dispatch<React.SetStateAction<Abnormality>>) => {
    return(
      <form>
        <hr />
        <h2>現在のAbnormalityデータ</h2>
        <button onClick={(e)=>handleDownload(Conver2XML(abnormality), abnormality)}>Download</button>
        <pre style={{ textAlign: 'left', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
            {Conver2XML(abnormality).stat}
        </pre>
        <pre style={{ textAlign: 'left', backgroundColor: '#f0f0a0', padding: '10px', borderRadius: '5px' }}>
            {Conver2XML(abnormality).info}
        </pre>
        <pre style={{ textAlign: 'left', backgroundColor: '#f0f0e0', padding: '10px', borderRadius: '5px' }}>
            {Conver2XML(abnormality).creature}
        </pre>
        <pre style={{ backgroundColor: '#f0f0b0', padding: '10px', borderRadius: '5px' }}>
            {Conver2XML(abnormality).gen}
        </pre>
      </form>

    );
};
export default ExportData;