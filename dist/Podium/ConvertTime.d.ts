export declare class ConvertTime {
    private APIDateRegEx;
    private data;
    constructor(data: object);
    ToUTC(): object;
    ToAPI(): object;
    private loopNestedObj;
    private isAPIDate;
    private StringToUTC;
    private DateToAPI;
    private strPad;
}
