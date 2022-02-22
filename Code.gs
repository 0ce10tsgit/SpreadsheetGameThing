function dummy(){
    //WHY DOES APPS SCRIPT HAVE TO CALL THE TOP FUNCTION ON RUN LET ME DEBUG IN PEACE
    Logger.log('hello')
  }
function str(content){
  return content.toString()
}
function int(content){
  return parseInt(content)
}
function print(content){
  Logger.log('Print: ' + content)
}
function clear(){
  SpreadsheetApp.getActiveSheet().getRange(1,1,26,26).setBackground('white')
}
var obs = []
const c = CacheService.getDocumentCache()
const sht = SpreadsheetApp.getActiveSheet()
c.put('qx',0)
c.put('qy',0)
function borders(color){
  nums = Array(26).keys()
  for (const x of nums){
    sht.getRange(1,x+1).setBackground(color)
    sht.getRange(26,x+1).setBackground(color)
    sht.getRange(x+1,1).setBackground(color)
    sht.getRange(x+1,26).setBackground(color)
  }
  sht.flush()
}
function render_block(xy,color){
  if ((xy.length-1) > 2){
    sht.getRange(xy[0],xy[1],xy[2],xy[3]).setBackground(color)
  }
  else {
    sht.getRange(xy[0],xy[1]).setBackground(color)
  }
}
class main_person{
  constructor(costume,x,y){
    this.x = x
    this.y = y
    this.costume = costume
  }
  get coordinates(){
    return [this.x,this.y]
  }
  get suit(){
    return this.costume
  }
  appear(){
    render_block([this.x,this.y],this.costume)
  }
  coords(xy){
    this.x = xy[0]
    this.y = xy[1]
  }
}

function down(){
  c.put('qx',1)
}
function up(){
  c.put('qx',-1)
}
function left(){
  c.put('qy',-1)
}
function right(){
  c.put('qy',1)
}
function showControls(){
  var widget = HtmlService.createHtmlOutputFromFile("Controls.html");
  widget.setTitle("Controls");
  SpreadsheetApp.getUi().showSidebar(widget);
}
var idk;
function main(){
  idk = new main_person('red',2,2)
  showControls()
  while (true){
    clear()
    let newx = int(idk.coordinates[0]) + int(c.get('qx'))
    let newy = idk.coordinates[1] + int(c.get('qy'))
    c.put('qx',0)
    c.put('qy',0)
    idk.coords([newx,newy])
    idk.appear()
    SpreadsheetApp.flush()
    Utilities.sleep(500)
}
}
