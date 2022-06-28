var list_header_city='<li class="list-group-item list_header"><div class="container"><div class="row"><div class="col-sm-2">Номер поїзда</div><div class="col-sm-3">Місто відправлення</div><div class="col-sm-2">Час відправлення </div><div class="col-sm-3">Місто приубття </div><div class="col-sm-2">Час прибуття</div></div></div></li> ';
var list_header_code='<li class="list-group-item list_header"><div class="container"><div class="row"><div class="col-sm-3">Місто</div><div class="col-sm-3">Час приубття</div><div class="col-sm-3">Час відправлення</div></div></div></li> ';

$(document).ready( ()=>{
  $("#row_number").hide();
  $("#list_row").hide();

  $("#switch").change(()=>{
     let state=   $("#switch").is(":checked");
      $("#list").html(" ");
    if(state){
      $("#switch_label").html("<h4>Пошук за номером</h4>");
      $("#row_cities").hide();
      $("#row_number").fadeIn(1000);
      //$("#row_number").show();

    }
    else {
      $("#switch_label").html("<h4>Пошук за пунктами</h4>");
      $("#row_number").hide();
      $("#row_cities").fadeIn(1000);
    }
  });
  $("#search_button").click(()=>{
    $("#list").html(" ");
    let state= $("#switch").is(":checked");
    if(state){
      let code=$("#code").val();
      if(code==""){
         SnackBar({
          message:"Поле \"Номер\" не може бути пусте ",
          timeout:5000,
          position:'br',
          fixed:true,
          width:"20vw",
          status:"error",
          // container:document.getElementById("mainBody")
        });
      }
      let result=findRouteByCode(code);
      if(result!=undefined){
        $("#list_row").hide();
        result.forEach(( i) => {
          $("#list").append('<li class="list-group-item list_item"><div class="container"><div class="row"><div class="col-sm-3">'+i.city+'</div><div class="col-sm-3">'+i.startTime+'</div><div class="col-sm-3">'+i.endTime+'</div></div></div></li> ');
        });
        $("#list").prepend('<li class="list-group-item list_item"><div class="container"><div class="row"><div class="col-sm-12" style="text-align:left;color:#242945;">'+result[0].periodic+'</div></div></div></li>');
        $("#list").prepend(list_header_code);
        $("#list_row").fadeIn(1000);
        return;
      }
      SnackBar({
       message:"Невірний код",
       timeout:5000,
       position:'br',
       fixed:true,
       width:"20vw",
       status:"error"
     });
    }
    else {
      let cityFrom=$("#cityFrom").val();
      let cityTo=$("#cityTo").val();
      console.log("Cityfrom="+cityFrom);
      if(cityFrom==""){
         SnackBar({
          message:"Поле \"Пункт відправлення\" не може бути пусте ",
          timeout:5000,
          position:'br',
          fixed:true,
          width:"20vw",
          status:"error"
        });
      }
      if(cityTo==""){
         SnackBar( {
          message:"Поле \"Пункт прибуття\" не може бути пусте ",
          timeout:5000,
          position:'br',
          fixed:true,
          width:"20vw",
          status:"error"
        });
        return;
      }
      if(cityTo!=""&&cityTo==cityFrom){
        SnackBar( {
         message:"Поля \"Пункт прибуття\" і \"Пункт відправлення\"  не можуть співпадати ",
         timeout:5000,
         position:'br',
         fixed:true,
         width:"20vw",
         status:"error"
         });
         return;
      }

      let result=findRouteByCity(cityFrom,cityTo);
      if(result.length>0){
        $("#list_row").hide();
        result.forEach(( i) => {
          $("#list").append('<li class="list-group-item list_item"><div class="container"><div class="row"><div class="col-sm-2">'+i.code+'</div><div class="col-sm-3">'+cityFrom+'</div><div class="col-sm-2">'+i.startTime+'</div><div class="col-sm-3">'+cityTo+'</div><div class="col-sm-2">'+i.endTime+'</div> </div> <div class="row" ><div class="col-sm-12" style="text-align:left;color:#242945;"><i>'+i.periodic+'<i></div></div> </div></li>');
        });
        $("#list").prepend(list_header_city);
        $("#list_row").fadeIn(1000);
        return ;
      }
      SnackBar( {
       message:"Немає данних",
       timeout:5000,
       position:'br',
       fixed:true,
       width:"20vw",
       status:"error"
     });

    }
  });
});
function findRouteByCity( cityFrom,cityTo ){
  let resArr=[];
  routes.forEach(( i) => {
    let match= find(i,cityFrom,cityTo);
    if(match!=undefined) resArr.push(match);
  });
  return resArr;
}
function find(route,cityFrom,cityTo) {
  let n1=route["stops"].find( element=>element[0]===cityFrom );
  let n2=route["stops"].find( element=>element[0]===cityTo );
  let i1=route["stops"].indexOf(n1);
  let i2=route["stops"].indexOf(n2);
  if(i1<i2&&i1!=-1&&i2!=-1) {
    let code=route["code"];
    let startTime=route["stops"][i1][2];
    let endTime=route["stops"][i2][1];
    let periodic=route["periodic"];
    if(code==undefined)return;
    return new Match(code,cityFrom,cityTo,startTime,endTime,periodic);
  }
}
function findRouteByCode(code) {
  let res=routes.find( element=>element["code"]==code);
  if(res!=undefined){
     let resArr=[];
     res["stops"].forEach((i) => {
       resArr.push(new Stop(i[0],i[1],i[2],res['periodic']));
     });

     return resArr;
   }
}
