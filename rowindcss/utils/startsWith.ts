export default (str: string, prefix: string) => {
    let strArr = str.split("")
    let prefixArr = prefix.split("")
    let l = 0;
    let r = math.min(str.size(), prefix.size()) - 1;
  
    while (l <= r) {
      const m = math.floor((l + r) / 2);
      if (strArr[m] === prefixArr[m]) {
        l = m + 1;
      } else {
        r = m - 1;
      }
    }
    
    return r + 1 >= prefix.size();
}