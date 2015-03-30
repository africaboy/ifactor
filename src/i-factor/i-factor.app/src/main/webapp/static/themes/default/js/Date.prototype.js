//---------------------------------------------------  
// �ж�����  
//---------------------------------------------------  
Date.prototype.isLeapYear = function()   
{   
    return (0==this.getYear()%4&&((this.getYear()%100!=0)||(this.getYear()%400==0)));   
}   
  
//---------------------------------------------------  
// ���ڸ�ʽ��  
// ��ʽ YYYY/yyyy/YY/yy ��ʾ���  
// MM/M �·�  
// W/w ����  
// dd/DD/d/D ����  
// hh/HH/h/H ʱ��  
// mm/m ����  
// ss/SS/s/S ��  
//---------------------------------------------------  
Date.prototype.Format = function(formatStr)   
{   
    var o = {
        "M+": this.getMonth() + 1, //�·�         
        "d+": this.getDate(), //��         
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //Сʱ         
        "H+": this.getHours(), //Сʱ         
        "m+": this.getMinutes(), //��         
        "s+": this.getSeconds(), //��         
        "q+": Math.floor((this.getMonth() + 3) / 3), //����         
        "S": this.getMilliseconds() //����         
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    
    if (/(y+)/.test(formatStr)) {
        formatStr = formatStr.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(formatStr)) {
        formatStr = formatStr.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(formatStr)) {
            formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return formatStr;
}   
  
//+---------------------------------------------------  
//| ������ʱ�������� ���ڸ�ʽΪ YYYY-MM-dd   
//+---------------------------------------------------  
function daysBetween(DateOne,DateTwo)  
{   
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));  
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);  
    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));  
  
    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));  
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);  
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));  
  
    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);   
    return Math.abs(cha);  
}  
  
  
//+---------------------------------------------------  
//| ���ڼ���  
//+---------------------------------------------------  
Date.prototype.DateAdd = function(strInterval, Number) {   
    var dtTmp = this;  
    switch (strInterval) {   
        case 's' :return new Date(dtTmp.getTime() + (1000 * Number));  
        case 'n': return new Date(dtTmp.getTime() + (60000 * Number));
        case 'h': return new Date(dtTmp.getTime() + (3600000 * Number));
        case 'd' :return new Date(dtTmp.getTime() + (86400000 * Number));  
        case 'w': return new Date(dtTmp.getTime() + ((86400000 * 7) * Number));
        case 'q' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number*3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'm' :return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
        case 'y' :return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());  
    }  
}  
  
//+---------------------------------------------------  
//| �Ƚ����ڲ� dtEnd ��ʽΪ�����ͻ�����Ч���ڸ�ʽ�ַ�  
//+---------------------------------------------------  
Date.prototype.DateDiff = function(strInterval, dtEnd) {   
    var dtStart = this;  
    if (typeof dtEnd == 'string' )//������ַ�ת��Ϊ������  
    {   
        dtEnd = StringToDate(dtEnd);  
    }  
    switch (strInterval) {   
        case 's' :return parseInt((dtEnd - dtStart) / 1000);  
        case 'n' :return parseInt((dtEnd - dtStart) / 60000);  
        case 'h' :return parseInt((dtEnd - dtStart) / 3600000);  
        case 'd' :return parseInt((dtEnd - dtStart) / 86400000);  
        case 'w' :return parseInt((dtEnd - dtStart) / (86400000 * 7));  
        case 'm' :return (dtEnd.getMonth()+1)+((dtEnd.getFullYear()-dtStart.getFullYear())*12) - (dtStart.getMonth()+1);  
        case 'y' :return dtEnd.getFullYear() - dtStart.getFullYear();  
    }  
}  
  
//+---------------------------------------------------  
//| ��������ַ�������ϵͳ��toString����  
//+---------------------------------------------------  
/*Date.prototype.toString = function(showWeek)  
{   
    var myDate= this;  
    var str ; 
    	
    	//myDate.toLocaleDateString();  
    if (showWeek)  
    {   
        var Week = ['��','һ','��','��','��','��','��'];  
        str += ' ����' + Week[myDate.getDay()];  
    }  
    return str;  
}  */
  
//+---------------------------------------------------  
//| ���ںϷ�����֤  
//| ��ʽΪ��YYYY-MM-DD��YYYY/MM/DD  
//+---------------------------------------------------  
function IsValidDate(DateStr)   
{   
    var sDate=DateStr.replace(/(^\s+|\s+$)/g,''); //ȥ���߿ո�;   
    if(sDate=='') return true;   
    //����ʽ����YYYY-(/)MM-(/)DD��YYYY-(/)M-(/)DD��YYYY-(/)M-(/)D��YYYY-(/)MM-(/)D���滻Ϊ''   
    //��ݿ��У��Ϸ����ڿ�����:YYYY-MM/DD(2003-3/21),��ݿ���Զ�ת��ΪYYYY-MM-DD��ʽ   
    var s = sDate.replace(/[\d]{ 4,4 }[\-/]{ 1 }[\d]{ 1,2 }[\-/]{ 1 }[\d]{ 1,2 }/g,'');   
    if (s=='') //˵����ʽ����YYYY-MM-DD��YYYY-M-DD��YYYY-M-D��YYYY-MM-D   
    {   
        var t=new Date(sDate.replace(/\-/g,'/'));   
        var ar = sDate.split(/[-/:]/);   
        if(ar[0] != t.getYear() || ar[1] != t.getMonth()+1 || ar[2] != t.getDate())   
        {   
            //alert('��������ڸ�ʽ����ʽΪ��YYYY-MM-DD��YYYY/MM/DD��ע�����ꡣ');   
            return false;   
        }   
    }   
    else   
    {   
        //alert('��������ڸ�ʽ����ʽΪ��YYYY-MM-DD��YYYY/MM/DD��ע�����ꡣ');   
        return false;   
    }   
    return true;   
}   
  
//+---------------------------------------------------  
//| ����ʱ����  
//| ��ʽΪ��YYYY-MM-DD HH:MM:SS  
//+---------------------------------------------------  
function CheckDateTime(str)  
{   
    var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;   
    var r = str.match(reg);   
    if(r==null)return false;   
    r[2]=r[2]-1;   
    var d= new Date(r[1],r[2],r[3],r[4],r[5],r[6]);   
    if(d.getFullYear()!=r[1])return false;   
    if(d.getMonth()!=r[2])return false;   
    if(d.getDate()!=r[3])return false;   
    if(d.getHours()!=r[4])return false;   
    if(d.getMinutes()!=r[5])return false;   
    if(d.getSeconds()!=r[6])return false;   
    return true;   
}   
  
//+---------------------------------------------------  
//| �����ڷָ������  
//+---------------------------------------------------  
Date.prototype.toArray = function()  
{   
    var myDate = this;  
    var myArray = Array();  
    myArray[0] = myDate.getFullYear();  
    myArray[1] = myDate.getMonth();  
    myArray[2] = myDate.getDate();  
    myArray[3] = myDate.getHours();  
    myArray[4] = myDate.getMinutes();  
    myArray[5] = myDate.getSeconds();  
    return myArray;  
}  
  
//+---------------------------------------------------  
//| ȡ�����������Ϣ  
//| ���� interval ��ʾ�������  
//| y �� m�� d�� w���� ww�� hʱ n�� s��  
//+---------------------------------------------------  
Date.prototype.DatePart = function(interval)  
{   
    var myDate = this;  
    var partStr='';  
    var Week = ['��','һ','��','��','��','��','��'];  
    switch (interval)  
    {   
        case 'y' :partStr = myDate.getFullYear();break;  
        case 'm' :partStr = myDate.getMonth()+1;break;  
        case 'd' :partStr = myDate.getDate();break;  
        case 'w' :partStr = Week[myDate.getDay()];break;  
        case 'ww' :partStr = myDate.WeekNumOfYear();break;  
        case 'h' :partStr = myDate.getHours();break;  
        case 'n' :partStr = myDate.getMinutes();break;  
        case 's' :partStr = myDate.getSeconds();break;  
    }  
    return partStr;  
}  
  
//+---------------------------------------------------  
//| ȡ�õ�ǰ���������µ��������  
//+---------------------------------------------------  
Date.prototype.MaxDayOfDate = function()  
{   
    var myDate = this;  
    var ary = myDate.toArray();  
    var date1 = (new Date(ary[0],ary[1]+1,1));  
    var date2 = date1.dateAdd(1,'m',1);  
    var result = dateDiff(date1.Format('yyyy-MM-dd'),date2.Format('yyyy-MM-dd'));  
    return result;  
}  
  
//+---------------------------------------------------  
//| ȡ�õ�ǰ������������һ���еĵڼ���  
//+---------------------------------------------------  
Date.prototype.WeekNumOfYear = function()  
{   
    var myDate = this;  
    var ary = myDate.toArray();  
    var year = ary[0];  
    var month = ary[1]+1;  
    var day = ary[2];  
    document.write('< script language=VBScript\> \n');  
    document.write('myDate = Datue(\''+month+'-'+day+'-'+year+'\') \n');  
    document.write('result = DatePart(\'ww\', myDate) \n');  
    document.write(' \n');  
    return result;  
}  
  
//+---------------------------------------------------  
//| �ַ�ת����������   
//| ��ʽ MM/dd/YYYY MM-dd-YYYY YYYY/MM/dd YYYY-MM-dd  
//+---------------------------------------------------  
function StringToDate(DateStr)  
{   
  
    var converted = Date.parse(DateStr);  
    var myDate = new Date(converted);  
    if (isNaN(myDate))  
    {   
        //var delimCahar = DateStr.indexOf('/')!=-1?'/':'-';  
        var arys= DateStr.split('-');  
        myDate = new Date(arys[0],--arys[1],arys[2]);  
    }  
    return myDate;  
}  