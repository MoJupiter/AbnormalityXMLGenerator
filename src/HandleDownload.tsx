import {Abnormality, AbnoXMLs} from './AbnormalityInterfaces'
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
async function handleDownload(xml:AbnoXMLs, abnormality: Abnormality){
    const zip = new JSZip();
    const rootFolder = zip.folder(abnormality.basicInfo.name_en);
    if(rootFolder != null){
        rootFolder.folder(`Equipment`);
        rootFolder.folder(`CustomEffect`);
        rootFolder.folder(`CreatureAnimation`);
        rootFolder.folder(`AgentAnimation`);
        const creatureFolder = rootFolder.folder(`Creature`);
        if(creatureFolder != null){
            const creatureGenFolder = creatureFolder.folder(`CreatureGen`);

            const creatureInfoFolder = creatureFolder.folder(`CreatureInfo`);
            const creatureInfoFolderJP = creatureInfoFolder?.folder(`jp`);
            const creatureInfoFolderEN = creatureInfoFolder?.folder(`en`);

            const creatureListFolder = creatureFolder.folder(`CreatureList`);
            const creaturesFolder = creatureFolder.folder(`Creatures`);
            const portraitFolder = creatureFolder.folder(`Portrait`);
            creatureGenFolder?.file(`${abnormality.basicInfo.name_en}.xml`, xml.gen);
            creatureInfoFolderJP?.file(`${abnormality.basicInfo.name_en}.xml`, xml.info);
            creatureInfoFolderEN?.file(`${abnormality.basicInfo.name_en}.xml`, xml.info);
            creatureListFolder?.file(`${abnormality.basicInfo.name_en}.txt`, xml.creature);
            creaturesFolder?.file(`${abnormality.basicInfo.name_en}_stat.txt`, xml.stat);
            portraitFolder?.file(`${abnormality.basicInfo.name_en}.png`);
            try {
                const content = await zip.generateAsync({ type: "blob" });
                saveAs(content, abnormality.basicInfo.name_en+".zip"); // `my_project.zip` という名前でダウンロード
            } catch (error) {
                console.error('ZIPファイル作成エラー:', error);
                alert('ZIPファイルの作成中にエラーが発生しました。');
            }
        }
    }/*
    let blob = new Blob([xml.stat], { type: 'text/plain' }); // ファイル内容とMIMEタイプ
    let url = URL.createObjectURL(blob); // ダウンロード用のURLを生成
    let a = document.createElement('a');
    a.href = url;
    a.download = `${abnormality.basicInfo.name_en}_stat.txt`; // ダウンロードされるファイル名
    document.body.appendChild(a);
    a.click(); // 自動クリック
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // メモリ解放

    blob = new Blob([xml.info], { type: 'text/plain' }); // ファイル内容とMIMEタイプ
    url = URL.createObjectURL(blob); // ダウンロード用のURLを生成
    a = document.createElement('a');
    a.href = url;
    a.download = `info_${abnormality.basicInfo.name_en}.xml`; // ダウンロードされるファイル名
    document.body.appendChild(a);
    a.click(); // 自動クリック
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // メモリ解放

    blob = new Blob([xml.creature], { type: 'text/plain' }); // ファイル内容とMIMEタイプ
    url = URL.createObjectURL(blob); // ダウンロード用のURLを生成
    a = document.createElement('a');
    a.href = url;
    a.download = `list_${abnormality.basicInfo.name_en}.txt`; // ダウンロードされるファイル名
    document.body.appendChild(a);
    a.click(); // 自動クリック
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // メモリ解放

    blob = new Blob([xml.gen], { type: 'text/plain' }); // ファイル内容とMIMEタイプ
    url = URL.createObjectURL(blob); // ダウンロード用のURLを生成
    a = document.createElement('a');
    a.href = url;
    a.download = `gen_${abnormality.basicInfo.name_en}.txt`; // ダウンロードされるファイル名
    document.body.appendChild(a);
    a.click(); // 自動クリック
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // メモリ解放*/
};
export default handleDownload;