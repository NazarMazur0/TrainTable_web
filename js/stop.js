class Stop{
  #city;
  #startTime;
  #endTime;
  #periodic;

  constructor(city,startTime,endTime,periodic){
        this.#city = city;
        this.#startTime = startTime;
        this.#endTime = endTime;
        this.#periodic=periodic;
  }
  set city(city){
    this.#city = city;
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

  get city(){
    return this.#city;
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
