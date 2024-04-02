/**
 * @description 校验参数
 * @param {String} data 被校验的字符串
 * @param {String} type 可选值：email、phone
 * @returns
 */
export function validateParam(data: string, type: "email" | "phone") {
  if (type === "email") {
    return new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(
      data
    );
  } else if (type === "phone") {
    return new RegExp(
      /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
    ).test(data);
  } else {
    return false;
  }
}

/**
 * @description 生成 guid
 * @returns {string}
 */
export function guid() {
  let d = new Date().getTime();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
