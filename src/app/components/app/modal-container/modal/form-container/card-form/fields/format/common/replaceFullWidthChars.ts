export default function(str: string) {
    if (str == null) {
        str = '';
    }
    const fullWidth = '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19';
    const halfWidth = '0123456789';
    let value = '';
    const chars = str.split('');
    for (let i = 0, len = chars.length; i < len; i++) {
        let chr = chars[i];
        const idx = fullWidth.indexOf(chr);
        if (idx > -1) {
            chr = halfWidth[idx];
        }
        value += chr;
    }
    return value;
}
