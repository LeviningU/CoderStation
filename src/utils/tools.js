
/**
 * 
 * @param {Number} time 时间戳
 * @param {String} part 时间格式
 * @returns {String}
 */
export function formatTime(time, part) {
    const date = new Date(time);
    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }
    const weekArr = ["日", "一", "二", "三", "四", "五", "六"];
    const year = date.getFullYear();
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDate());
    const hour = addZero(date.getHours());
    const minute = addZero(date.getMinutes());
    const second = addZero(date.getSeconds());
    const week = weekArr[date.getDay()];


    switch (part) {
        // yyyy-MM-dd
        case "year":
            return `${year}-${month}-${day}`;
        // hh:mm:ss
        case "time":
            return `${hour}:${minute}:${second}`;
        // yyyy-MM-dd hh:mm:ss
        case "year-time":
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        // hh:mm:ss week
        case "time-week":
            return `${hour}:${minute}:${second} 星期${week}`;
        // yyyy-MM-dd hh:mm:ss week
        default:
            return `${year}-${month}-${day} ${hour}:${minute}:${second} 星期${week}`;
    }
}

export function typeOptionCreator(Select, typeList) {
    return typeList.map((item) => {
        return (
            <Select.Option key={item._id} value={item._i}>
                {item.typeName}
            </Select.Option>
        );
    });
}