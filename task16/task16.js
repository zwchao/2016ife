/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var aqicity = document.getElementById("aqi-city-input").value.trim();//input访问其内部值使用value属性
  var aqidata = document.getElementById("aqi-value-input").value.trim();
  if(!aqicity.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
    alert("请输入中英文字符！谢谢！");
    return;
  }
  if (!aqidata.match(/^\d+$/)) {
    alert("请输入正整数且数字在1-1000之间");
    return;
  }
  aqiData[aqicity]=aqidata;//通过将把城市名设为属性，对应的aqi设为其属性值。将2个HTMLCollection相关联
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var table = document.getElementById("aqi-table");
  table.innerHTML = "";//利用appenChild()方法时需先将父元素内部置空
  for (aqicity in aqiData) {//利用for in 进行遍历此处为for key in object，key指对象的属性
    if(table.children.length===0){
      table.innerHTML = "<td>城市</td><td>空气质量</td><td>操作</td>"
    }
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.innerHTML = aqicity;//属性名
    tr.appendChild(td1);
    var td2 = document.createElement("td");
    td2.innerHTML = aqiData[aqicity];//属性值
    tr.appendChild(td2);
    var td3 = document.createElement("td");
    td3.innerHTML = "<button class='btndelete'>删除</button>";
    tr.appendChild(td3);
    table.appendChild(tr);
    // statement
  }

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  var tr = target.parentElement.parentElement;//target指的是被点击的按钮，通过两次寻找父节点找到此按钮所在的行
  var table = document.getElementById("aqi-table");
  table.removeChild(tr);//移除被点击按钮的行


  // do sth.

 return table;
}

function init() {
  var btnAdd = document.getElementById("add-btn");
  btnAdd.onclick = addBtnHandle;
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
 var table = document.getElementById("aqi-table");
 table.addEventListener("click", function(e) {//对表里的所有按钮都加上事件，通过if语句进行筛选
        if (e.target && e.target.nodeName === "BUTTON") {
            delBtnHandle(e.target);
        }
    })
}

init();
