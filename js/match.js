class Match{
  #code;
  #start;
  #end;
  #startTime;
  #endTime;
  #periodic;

  constructor(code,start,end,startTime,endTime,periodic){
        this.#code = code;
        this.#start = start;
        this.#end = end;
        this.#startTime = startTime;
        this.#endTime = endTime;
        this.#periodic=periodic;
  }
  set code(code){
    this.#code = code;
  }
  set start(start){
    this.#start = start;
  }
  set end(end){
    this.#end = end;
  }
  set startTime(startTime){
      this.#startTime = startTime;
  }
  set endTime(end){
    this.#endTime = endTime;
  }
  set periodic(periodic){
    this.#periodic=periodic;
  }

  get code(){
    return this.#code;
  }
  get start(){
    return this.#start;
  }
  get end(){
    return this.#end;
  }
  get startTime(){
    return this.#startTime;
  }
  get endTime(){
    return this.#endTime;
  }
  get periodic(){
    return this.#periodic;
  }
}
