!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var i in n)("object"==typeof exports?exports:e)[i]=n[i]}}("undefined"!=typeof self?self:this,function(){return function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=83)}({1:function(e,t,n){e.exports=n(3)(411)},2:function(e,t){e.exports=_xe_bundle_common},20:function(e,t,n){e.exports=n(2)(418)},3:function(e,t){e.exports=_xe_bundle_vendor},83:function(e,t,n){e.exports=n(84)},84:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(1),a=i(o),d=n(20),r=i(d),s=function(){this.group="",this.databaseName="",this.containerName="",this.$container="",this.init=function(e,t){this.group=e,this.databaseName=t,this.containerName="__xe_container_DF_setting_"+e,this.$container=(0,a.default)("#"+this.containerName),this.$container.$form=this.$container.find(".__xe_add_form"),this.$container.$modal=this.$container.find(".__xe_df_modal"),this.$container.$modal.$body=this.$container.$modal.find(".modal-body"),this.validator=new r.default,this.attachEvent(),this.closeAll=function(){this.$container.$modal.xeModal("hide")}},this.attachEvent=function(){var e=this;this.$container.on("click",".__xe_btn_add",function(){e.$container.$modal.$body.html(e.formClone()),e.$container.$modal.xeModal("show");var t=e.$container.$modal.find(".dynamic-lang-editor-box");t.addClass("lang-editor-box"),window.langEditorBoxRender(t)}),this.$container.on("click",".__xe_btn_submit",function(){e.store(this)}),this.$container.on("click",".__xe_btn_close",function(){e.close(this)}),this.$container.on("click",".__xe_btn_edit",function(t){t.preventDefault(),e.closeAll(),e.edit(this)}),this.$container.on("click",".__xe_btn_delete",function(t){t.preventDefault(),e.destroy(this),e.closeAll()}),this.$container.on("change",".__xe_type_id",function(t){var n=(0,a.default)(this).closest("form"),i=n.find('[name="skinId"]');i.find("option").remove(),i.prop("disabled",!0),e.getSkinOption(n)}),this.$container.on("change",".__xe_skin_id",function(t){var n=(0,a.default)(this).closest("form");e.getAdditionalConfigure(n)}),this.$container.on("click",".__xe_checkbox-config",function(e){var t=(0,a.default)(e.target);(0,a.default)(this).closest("form").find('[name="'+t.data("name")+'"]').val(1==t.prop("checked")?"true":"false")})},this.getFormContainer=function(e){return e.closest(".__xe_form_container")},this.close=function(e){(0,a.default)(e).closest("form").remove(),this.$container.$modal.xeModal("hide")},this.getList=function(){var e={group:this.group},t=this;window.XE.ajax({context:this.$container[0],type:"get",dataType:"json",data:e,url:window.XE.route("manage.dynamicField.index")}).done(function(e,n,i){t.$container.find("#df-tbody tr").remove();for(var o in e.list)t.addrow(e.list[o])})},this.formClone=function(){var e=this.$container.$form.clone().removeClass("__xe_add_form");return e.show(),e},this.addrow=function(e){var t=this.$container.find(".__xe_row").clone();t.removeClass("__xe_row"),t.addClass("__xe_row_"+e.id),t.data("id",e.id),t.find("td.__xe_column_id").html(e.id),t.find("td.__xe_column_label").html(e.label),t.find("td.__xe_column_typeName").html(e.typeName),t.find("td.__xe_column_skinName").html(e.skinName),t.find("td.__xe_column_use").html(1==e.use?"True":"False"),0!=this.$container.find(".__xe_tbody").find(".__xe_row_"+e.id).length?this.$container.find(".__xe_tbody").find(".__xe_row_"+e.id).replaceWith(t.show()):(this.removeRow(e.id),this.$container.find(".__xe_tbody").append(t.show()))},this.removeRow=function(e){this.$container.find(".__xe_tbody").find(".__xe_row_"+e).remove()},this.edit=function(e){var t=(0,a.default)(e).closest("tr"),n=t.data("id"),i=this.formClone();i.data("isEdit","1"),i.attr("action",window.XE.route("manage.dynamicField.update")),this.$container.$modal.$body.html(i),this.$container.$modal.xeModal("show");var o={group:this.group,id:n},d=this;window.XE.ajax({context:this.$container.$modal.$body[0],type:"get",dataType:"json",data:o,url:window.XE.route("manage.dynamicField.getEditInfo"),success:function(e){i.find('[name="id"]').val(e.config.id).prop("readonly",!0),i.find('[name="typeId"] option').each(function(){var t=(0,a.default)(this);t.val()!=e.config.typeId&&t.remove()});var t=i.find(".dynamic-lang-editor-box");t.data("lang-key",e.config.label),t.addClass("lang-editor-box"),window.langEditorBoxRender(t),i.find('[name="use"]').val(d.checkBox(e.config.use)?"true":"false"),i.find('[name="required"]').val(d.checkBox(e.config.required)?"true":"false"),i.find('[name="sortable"]').val(d.checkBox(e.config.sortable)?"true":"false"),i.find('[name="searchable"]').val(d.checkBox(e.config.searchable)?"true":"false"),i.find('[data-name="use"]').prop("checked",d.checkBox(e.config.use)),i.find('[data-name="required"]').prop("checked",d.checkBox(e.config.required)),d.getSkinOption(i)}})},this.checkBox=function(e){var t=!1;return void 0==e?t=!1:"false"==e?t=!1:"true"==e?t=!0:1==e&&(t=!0),t},this.destroy=function(e){if(!1!==confirm("이동작은 되돌릴 수 없습니다. 계속하시겠습니까?")){var t=(0,a.default)(e).closest("tr"),n=t.data("id"),i={group:this.group,databaseName:this.databaseName,id:n},o=this;window.XE.ajax({context:this.$container[0],type:"post",dataType:"json",data:i,url:window.XE.route("manage.dynamicField.destroy"),success:function(e){var t=e.id;e.id==e.updateid&&o.openStep("close"),o.removeRow(t)}})}},this.getSkinOption=function(e){var t=e.serialize(),n=this;e.find(".__xe_additional_configure").html(""),""!=e.find('[name="typeId"]').val()&&window.XE.ajax({context:this.$container.$modal.$body[0],type:"get",dataType:"json",data:t,url:window.XE.route("manage.dynamicField.getSkinOption"),success:function(t){n.skinOptions(e,t.skins,t.skinId)}})},this.skinOptions=function(e,t,n){var i=e.find('[name="skinId"]');i.find("option").remove();for(var o in t){var d=(0,a.default)("<option>").attr("value",o).text(t[o]);i.append(d)}void 0!=n&&""!=n&&i.val(n),i.prop("disabled",!1),this.getAdditionalConfigure(e)},this.getAdditionalConfigure=function(e){var t={};e.serializeArray().forEach(function(e){t[e.name]=e.value}),window.XE.get("manage.dynamicField.getAdditionalConfigure",t,{headers:{"X-XE-Async-Expose":!0}}).then(function(t){e.find(".__xe_additional_configure").html(t.data.result)})},this.store=function(e){var t=this.$container.$modal.$body.find("form"),n=this;try{this.validateCheck(t)}catch(e){return}var i=t.serialize();window.XE.ajax({context:this.$container.$modal.$body[0],type:"post",dataType:"json",data:i,url:t.attr("action"),success:function(t){n.addrow(t),n.close(e)}})},this.setValidateRule=function(e,t){var n=this.validator.getRuleName(e);void 0!=t&&void 0!=n&&this.validator.setRules(n,t)},this.validateCheck=function(e){this.validator.check(e)}};t.default=s;var c=new s;c.init(window.dynamicFieldData.group,window.dynamicFieldData.databaseName),c.getList()}})});