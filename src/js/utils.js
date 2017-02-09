export var forEach = function(arr, func){
   for(var i = 0 ; i < arr.length; i++){
       func(arr[i], i, arr)
   }
 }

export var isDefined = function(someStr){
  if(someStr === ''){
    someStr = "N/A"
  }
  return someStr
}
