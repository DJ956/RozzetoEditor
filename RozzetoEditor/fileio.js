function load(path){
    $.ajax(path, {
        complete: function(e){
            var data = e.responseText;
            var list = JSON.parse(data);
            console.log(list);

            list.forEach(itm =>{
                var btn = create_btn(itm["id"], itm["top"], itm["left"]);
                $("#box").append(btn);
            });
        }
    });
}

function save(path, rozetts){
    var list = [];
    rozetts.each(function(idx){
        var pos = $(this).position();
        var id = $(this).attr("id");

        let data = {"id" : id, "top" : pos.top, "left" : pos.left};
        list.push(data);
    });

    let json = JSON.stringify(list);
    let blob = new Blob([json], {type:'application/json'});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = path;
    a.click();
    URL.revokeObjectURL(a.href);
}

$("#load_btn").on("change", function(e){
    var file = e.target.files;
    if(file.length == 0){return;}

    var reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = function(){
        load(reader.result);
    }
});

$("#save_btn").on("click", function(){
    save("./test.json", $(".rozetto"));
});