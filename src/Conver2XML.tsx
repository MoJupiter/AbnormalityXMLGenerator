import {Abnormality, RWBP} from "./AbnormalityInterfaces"

const Conver2XML = (abn: Abnormality) =>{
  let bonuss = "";
  for(let i = 0; i < abn.skillInfo.observeBonus.length; i++){
      const output = abn.skillInfo.observeBonus[i];
        bonuss+=`<observeBonus level="${output.level}" type="${output.type}">${output.data}</observeBonus>\n    `;
  }
    const cares = abn.basicInfo.specialTips.map((output, index) => {
        return `<observeElement name="care_${index}" cost="${output.cost}" />\n`;
    });
    const codeNo = abn.basicInfo.codeNo.map((output, index) => {
        return `<codeNo openLevel="${output.openLevel}">${output.data}</codeNo>\n`;
    });
    const portrait = abn.basicInfo.portrait.map((output, index) => {
        return `<portrait openLevel="${output.openLevel}">Custom/${output.data}</portrait>\n`;
    });
    const narration = abn.skillInfo.narration.map((output, index) => {
        return `<narration action="mid${index}">${output}</narration>\n`;
    });
    const name = abn.basicInfo.name.map((output, index) => {
        return `<name openLevel="${output.openLevel}">${output.data}</name>`;
    });
    const riskLevel = abn.basicInfo.riskLevel.map((output, index) => {
        return `<riskLevel openLevel="${output.openLevel}">${output.data}</riskLevel>\n`;
    });
    const openText = abn.basicInfo.openText.map((output, index) => {
        return `<openText>${output.data}</openText>\n`;
    });
    const desc = abn.basicInfo.desc.map((output, index) => {
        return `<desc id="${output.openLevel}" openLevel="${output.openLevel}"> [ {${output.data}} ] </desc>\n`;
    });
    const specialTip = abn.basicInfo.specialTips.map((output, index) => {
        return `<specialTip openLevel="${output.openLevel}" key="${index}">${output.data}</specialTip>\n`;
    });
    const specialDamage = abn.escapeInfo.specialDamage.map((output, index) => {
        return `<damage id="${index}" type="${output.type}" min="${output.min}" max="${output.max}" />\n`;
    });
    let sum = abn.escapeInfo.defense.cost + abn.escapeInfo.defense.cost;
    for (let i = 0; i <abn.basicInfo.specialTips.length; i++) {
        sum += abn.basicInfo.specialTips[i].cost;
    }
    
    let stat = `<?xml version=\"1.0\"?\>
<creature\>
<script>${abn.basicInfo.name_en}</script\>
<stat\>
    <riskLevel>${abn.basicInfo.riskLevel[0].level}</riskLevel>
    <maxWorkCount>2</maxWorkCount>
    <workProb type="R\">
      <prob level="1\">${abn.skillInfo.workProb.Level1.R}</prob>
      <prob level="2\">${abn.skillInfo.workProb.Level2.R}</prob>
      <prob level="3\">${abn.skillInfo.workProb.Level3.R}</prob>
      <prob level="4\">${abn.skillInfo.workProb.Level4.R}</prob>
      <prob level="5\">${abn.skillInfo.workProb.Level5.R}</prob>
    </workProb\>
    <workProb type="W">
      <prob level="1">${abn.skillInfo.workProb.Level1.W}</prob>
      <prob level="2">${abn.skillInfo.workProb.Level2.W}</prob>
      <prob level="3">${abn.skillInfo.workProb.Level3.W}</prob>
      <prob level="4">${abn.skillInfo.workProb.Level4.W}</prob>
      <prob level="5">${abn.skillInfo.workProb.Level5.W}</prob>
    </workProb>
    <workProb type="B">
      <prob level="1">${abn.skillInfo.workProb.Level1.B}</prob>
      <prob level="2">${abn.skillInfo.workProb.Level2.B}</prob>
      <prob level="3">${abn.skillInfo.workProb.Level3.B}</prob>
      <prob level="4">${abn.skillInfo.workProb.Level4.B}</prob>
      <prob level="5">${abn.skillInfo.workProb.Level5.B}</prob>
    </workProb>
    <workProb type="P">
      <prob level="1">${abn.skillInfo.workProb.Level1.P}</prob>
      <prob level="2">${abn.skillInfo.workProb.Level2.P}</prob>
      <prob level="3">${abn.skillInfo.workProb.Level3.P}</prob>
      <prob level="4">${abn.skillInfo.workProb.Level4.P}</prob>
      <prob level="5">${abn.skillInfo.workProb.Level5.P}</prob>
    </workProb>
    <workCooltime>${abn.skillInfo.workCooltime}</workCooltime>
    <feelingStateCubeBounds>
        <cube>${abn.skillInfo.feelingStateCubeBounds.bad}</cube>
        <cube>${abn.skillInfo.feelingStateCubeBounds.norm}</cube>
        <cube>${abn.skillInfo.feelingStateCubeBounds.good}</cube>
    </feelingStateCubeBounds>
    <workDamage type="${abn.skillInfo.workDamage.type}" min="${abn.skillInfo.workDamage.min}" max="${abn.skillInfo.workDamage.max}" />
    <workSpeed>${abn.skillInfo.workSpeed}</workSpeed>

    <defense id="1">
      <defenseElement type="R">${abn.escapeInfo.defense.data.R}</defenseElement>
      <defenseElement type="W">${abn.escapeInfo.defense.data.W}</defenseElement>
      <defenseElement type="B">${abn.escapeInfo.defense.data.B}</defenseElement>
      <defenseElement type="P">${abn.escapeInfo.defense.data.P}</defenseElement>
    </defense>
    <hp>${abn.escapeInfo.HP}</hp>
    <speed>${abn.escapeInfo.speed}</speed>
    <specialDamage>
        ${specialDamage}
    </specialDamage>

    <observeInfo total="${sum}">
    <observeElement name="stat" cost="${abn.escapeInfo.defense.cost}" />
    <observeElement name="defense" cost="${abn.escapeInfo.defense.cost}" />
    <observeElement name="work_r" cost="${abn.skillInfo.workProb.openCost}" />
    <observeElement name="work_w" cost="${abn.skillInfo.workProb.openCost}" />
    <observeElement name="work_b" cost="${abn.skillInfo.workProb.openCost}" />
    <observeElement name="work_p" cost="${abn.skillInfo.workProb.openCost}" />
    ${cares}
    </observeInfo>
    ${bonuss}
    <escapeable>${abn.escapeInfo.escapable}</escapeable>
    <equipment level="${abn.skillInfo.armor.level}" cost="${abn.skillInfo.armor.cost}" equipId="${abn.skillInfo.armor.id}" />
    <equipment level="${abn.skillInfo.weapon.level}" cost="${abn.skillInfo.weapon.cost}" equipId="${abn.skillInfo.weapon.id}" />
    <equipment level="${abn.skillInfo.gift.level}" prob="${abn.skillInfo.gift.prob}" equipId="${abn.skillInfo.gift.id}" />
    <qliphoth>${abn.skillInfo.qliphoth}</qliphoth>

</stat>
<graph>
    <node id="creature" x="-1.4" y="-2.0" type="creature" />
    <node id="workspace" x="1.9" y="-1.8" type="workspace" />
    <!--<node id="door"  x="2" y="-1" type="entry"/>-->
    <node id="outter" x="0" y="0" type="outterDoor" />
    <node id="inner" x="2" y="-1.8" type="innerDoor" />
    <node id="teddy" x="-0.2" y="-1.8" type="custom" />

    <edge node1="teddy" node2="inner" type="road" />
    <edge node1="workspace" node2="inner" type="road" />
    <edge node1="creature" node2="workspace" type="road" />
</graph>
<anim prefab="Custom/${abn.basicInfo.name_en}Anim" x="-2" y="-2" />
<portrait src="Unit/creature/magicalGirl" />
</creature>`;

    let info = `<creature>
<info id="${abn.basicInfo.id}">
<narration action="move"> ${abn.skillInfo.narration_move}</narration>
<narration action="start"> ${abn.skillInfo.narration_start}</narration>
${narration}
</info>
<observe level="1">
    <collection>
        ${codeNo}
        ${portrait}
        ${name}
        ${riskLevel}
        ${openText}
    </collection>
        ${desc}
    <specialTipSize size="${abn.basicInfo.specialTips.length}">
        ${specialTip}
        ${specialTip}
    </specialTipSize>
</observe>
</creature>`;

    let creature = `<?xml version="1.0" encoding="UTF-8" ?>
<creature_list>
<creature name="${abn.basicInfo.name_en}" src="${abn.basicInfo.name_en}" id="${abn.basicInfo.id}">
    <stat>${abn.basicInfo.name_en}_stat</stat>
  </creature>
</creature_list>`;
    let gen = `<All>
<add>${abn.basicInfo.id}</add>
</All>`;
    

    const result = {stat:stat, creature:creature, info:info, gen:gen};
    return (result);
}
export default Conver2XML;