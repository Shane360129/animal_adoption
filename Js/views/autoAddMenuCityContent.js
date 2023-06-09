// 自動新增選單城市內容
export function autoAddMenuCityContent(regCity){
  const taiwanCities = [
    "基隆市",
    "臺北市",
    "新北市",
    "桃園市",
    "新竹市",
    "新竹縣",
    "苗栗縣",
    "臺中市",
    "彰化縣",
    "南投縣",
    "雲林縣",
    "嘉義市",
    "嘉義縣",
    "臺南市",
    "高雄市",
    "屏東縣",
    "臺東縣",
    "花蓮縣",
    "金門縣",
    "澎湖縣",
    "連江縣",
    "宜蘭縣"
  ];
  for (let i = 0; i < taiwanCities.length; i++) {
    const optionElement = document.createElement("option");
    optionElement.text = taiwanCities[i];
    regCity.appendChild(optionElement);
  }
}