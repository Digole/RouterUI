<template>
  <section>
    
    <div class="line_02">
      <span>{{$t('DHCPLog.DHCPLog')}}</span>
    </div>
    
<textarea id = "div1"  style="width:1650px; height:740px" readonly>
</textarea>

    </section>
    </template>

<script>

    import md5 from 'js-md5'
export default {
  name: 'DHCPLog',
  data() {
    return {
      
     
    }
    },
     methods: {
    headerStyle() {
      return this.header()
    },
     },
      mounted() { 
        document.getElementById('div1').innerHTML = '读取中...';
        $(document).ready(function(){
	        $.ajax({async: true, url:"dhcpdlog",success:function(result){
                $("#div1").html(result);
		    }});
	    });
    }
}
</script>