/**
 * @Auther: hmj
 * @Description:
 * @Date: 2018/12/6 15:52
 * @Version:1.0
 */
let SIGN_REGEXP = /([yMdhsm])(\1*)/g;
let DEFAULT_PATTERN = "yyyy-MM-dd";

function padding(s,len) {
  // alert(String(s).length)
  //getFullYear/getMonth/getDate拿到的是Integer 需要用到length就需要将其转换为String==> s+""
  var len = len - (s+"").length;
  //判断加几个0
  for(let i = 0;i<len;i++){
    s = "0" + s;
  }
  return s;
}
export default {
  //时间格式转换
  formatDate:{
    format(date,pattern){
      pattern = pattern || DEFAULT_PATTERN;
      return pattern.replace(SIGN_REGEXP,function ($0) {
        //  $0 ==> pattern
        // alert($0)
        switch ($0.charAt(0)){
          case 'y': return padding(date.getFullYear(),$0.length);
          case 'M': return padding(date.getMonth()+1,$0.length);
          case 'd': return padding(date.getDate(),$0.length);
          case 'w': return date.getDay()+1;
          case 'h': return padding(date.getHours(),$0.length);
          case 'm': return padding(date.getMinutes(),$0.length);
          case 's': return padding(date.getSeconds(),$0.length)
        }
      })
    }
  }
}
