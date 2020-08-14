    export const getCtime = (time) => {
        function p(s) {
            return s < 10 ? "0" + s : s;
        }
        let newtime =(typeof time == "string"? new Date(time) : time) ;

        return (p(newtime.getFullYear()) + "-" + p(newtime.getMonth() + 1) + "-" + p(newtime.getDate()) + " " + p(newtime.getHours()) + ":" + p(newtime.getMinutes()) + ":" + p(newtime.getSeconds()))
    }