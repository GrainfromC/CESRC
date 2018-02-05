 const G = {
     serverUrl:"",
     DATABALES : {
         language: {
            emptyTable: "表中数据为空",
            info: "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
            infoEmpty: "当前显示第 0 至 0 项，共 0 项",
            infoFiltered: "(由 _MAX_ 项结果过滤)",
            infoPostFix: "",
            thousands: ",",
            lengthMenu: "每页 _MENU_ 项",
            loadingRecords: "",
            processing: "处理中...",
            search: "",
            searchPlaceholder: "",
            zeroRecords: "没有匹配结果",
            paginate: {
                first: "首页",
                last: "末页",
                next: "下页",
                previous: "上页"
            },
            aria: {
                sortAscending: "以升序排列此列",
                sortDescending: "以降序排列此列"
            },
            url: ""
        },
        creatNomalTable:function(prams){
            let options, self = this, data = prams.data;
            if(!data){
                return alert("表格方法，data!")
            };
            if(!prams.columns){
                return alert("表格方法，缺少参数columns!")
            };
             options = {
                 language : self.language,
                 serverSide: false,
                 paging:false,
                 ordering:false,
                 info:false,
                 searching: false,
                 renderer: "bootstrap",
                 pagingType: "simple_numbers",
                 data:data,
                 columnDefs: [{
                     "targets": 'nosort',
                     "orderable": false
                 }],
                 columns: prams.columns,
                 rowCallback:function (row: Node, data: any[] | object, index: number) {
                     if(prams.rowCallback && typeof prams.rowCallback == "function"){
                         prams.rowCallback(row, data, index);
                     };
                     $(row).off('click');
                     $(row).on("click", function () {
                         if ( $(this).hasClass('selected') ) {
                             $(this).removeClass('selected');
                         }
                         else {
                             $('tr.selected').removeClass('selected');
                             $(this).addClass('selected');
                         }
                     })
                 }
             };
            if(typeof prams.scrollX == "boolean"){
                options["scrollX"] = prams.scrollX;
            }else{
                options["autoWidth"] = true;
            };
            return options;
        },
         creatAjaxTable:function(prams){
             let options, self = this, url = prams.url || $("#query-form").attr("action"), temp;
             self._prams = prams;
             if(!url){
                 return alert("表格方法，缺少参数url!")
             }
             if(!prams.columns){
                 return alert("表格方法，缺少参数columns!")
             };

             options = {
                 language : self.language,
                 processing: true,
                 serverSide: true,
                 searching: false,
                 order: prams.order || [],
                 renderer: "bootstrap",
                 pagingType: "simple_numbers",
                 columnDefs: [{
                     "targets": 'nosort',
                     "orderable": false
                 }],
                 ajax: function (data, callback, settings) {
                     let param = {};
                     param["pageSize"] = data["length"];
                     param["startRow"] = data["start"];
                     param["pageNum"] = (data["start"] / data["length"]) + 1;
                     if (data.order.length > 0) {
                         param["columnName"] = prams["columns"][data.order[0]["column"]]["data"];
                         param["sorttype"] = data["order"][0]["dir"];
                     };
                     if (typeof prams.data == "function") {
                         temp = prams.data()
                     } else {
                         temp = prams.data
                     };
                     param = $.extend({}, param, temp);
                     $.ajax({
                         type: prams.type || "POST",
                         url: url,
                         cache: false,
                         data: param,
                         dataType: "json",
                         success: function (result) {
                             let returnData = {};
                             returnData["draw"] = data["draw"];
                             returnData["recordsTotal"] = result["total"];
                             returnData["recordsFiltered"] = result["total"];
                             returnData["data"] = result["data"];
                             callback(returnData);
                         }
                     });
                 },
                 columns: prams.columns,
                 rowCallback:function (row: Node, data: any[] | object, index: number) {
                     if(prams.rowCallback && typeof prams.rowCallback == "function"){
                         prams.rowCallback(row, data, index);
                     };
                     $(row).on("click", function () {
                         if ( $(this).hasClass('selected') ) {
                             $(this).removeClass('selected');
                         }
                         else {
                             $('tr.selected').removeClass('selected');
                             $(this).addClass('selected');
                         }
                     })
                 }
             };
             if(typeof prams.scrollX == "boolean"){
                 options["scrollX"] = prams.scrollX;
             }else{
                 options["autoWidth"] = true;
             };
             return options;
         }
     }

};
export { G as G};