<template>
  <section>
    
    <div class="line_02">
      <span>{{$t('ARPLog.ARPLog')}}</span>
    </div>
<textarea id = "div1" style="width:1650px; height:740px" readonly>
</textarea>

    </section>
    </template>

<script>
    import md5 from 'js-md5'
export default {
  name: 'ARPLog',
  data() {
        return {
    
        }
  },
      methods: {
        headerStyle() {
          return this.header()
        }
      },
      mounted() {
        // this.getInfo()
        document.getElementById('div1').innerHTML = '读取中...'                    // wyk读取日志文件
        $(document).ready(function() {
          $.ajax({async: true,
            url: 'arplog',
            success: function(result) {
              $('#div1').html(result)
            }})
    })
  }
}
</script>