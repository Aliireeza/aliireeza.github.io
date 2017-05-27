var ctx;
var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];
var functions = new Array();
functions.push("printk");
functions.push("module_init");
functions.push("cleanup_module");
functions.push("wait_queue_head_t");

functions.push("atomic_t");
functions.push("single_open");
functions.push("file_operations");
functions.push("spin_lock");

functions.push("access_ok");
functions.push("capable");
functions.push("atomic_read");
functions.push("atomic_dec_and_test");

functions.push("wait_event_interruptible");
functions.push("mempool_free");
functions.push("mempool_alloc");
functions.push("try_module_get");


functions.push("kmem_cache_create");
functions.push("class_create");
functions.push("alloc_chrdev_region");
functions.push("device_create");

functions.push("cdev_init");
functions.push("remove_proc_entry");
functions.push("request_irq");
functions.push("free_irq");

functions.push("usb_class_driver");
functions.push("seq_printf");
functions.push("kfifo_out");
functions.push("kfifo_alloc");

functions.push("list_for_each");
functions.push("list_entry");
functions.push("set_task_state");
functions.push("for_each_process");


functions.push("module_param");
functions.push("timer_list");
functions.push("tasklet_trylock");
functions.push("mdelay");

functions.push("barrier");
functions.push("tasklet_schedule");
functions.push("copy_to_user");
functions.push("copy_from_user");

functions.push("probe_irq_on");
functions.push("usb_register");
functions.push("tasklet_disable_nosync");
functions.push("del_timer");

functions.push("nf_hook_ops");
functions.push("nf_register_hook");
functions.push("kobj_attribute");
functions.push("skb_network_header");


functions.push("skb_transport_header");
functions.push("current_kernel_time");
functions.push("getnstimeofday");
functions.push("do_gettimeofday");

functions.push("for_each_possible_cpu");
functions.push("kcpustat_cpu");
functions.push("register_filesystem");
functions.push("mount_bdev");

functions.push("lfs_create_files");
functions.push("lfs_create_dir");
functions.push("full_name_hash");
functions.push("unregister_blkdev");

functions.push("blk_queue_logical_block_size");
functions.push("blk_fetch_request");
functions.push("sysfs_create_file");
functions.push("kobject_create_and_add");

var brushes = ["#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#c0392b"];
var position = new Array();
var f = 1;


function RandomNumber(first, last){
  var choices = last - first;
  return Math.floor(Math.random() * choices + first);
}


function RandomPosition(l){
  for(i=0; i<=3600; i+=6){
    position[i] = RandomNumber(0, dimension[0]);
    position[i+1] = RandomNumber(0, dimension[1]);
    position[i+2] = RandomNumber(0, 15);
    position[i+3] = RandomNumber(0, 44+l);
    position[i+4] = RandomNumber(0, 8);
    position[i+5] = RandomNumber(0, 100)/100;
  }
}


function DrawClear(x , y) {
    ctx.clearRect(0, 0, x, y);
}


function DrawKernel(){
  DrawClear(dimension[0], dimension[1]);
  for(i=0; i<=900; i+=6){
    ctx.beginPath();
    var r = i%8;

    ctx.font = ctx.font.replace(/\d+px/, (position[i+2]+10) + "px");
    ctx.globalAlpha = position[i+5];
    ctx.strokeStyle = brushes[position[i+4]].toString();
    ctx.strokeText(functions[position[i+3]], position[i], position[i+1]);
    ctx.closePath();
    ctx.stroke();

    position[i+5] -= RandomNumber(0, 100)/1000;
    if (position[i+5] < 0){
      position[i] = RandomNumber(0, dimension[0]);
      position[i+1] = RandomNumber(0, dimension[1]);
      position[i+2] = RandomNumber(0, 15);
      position[i+3] = RandomNumber(0, 64);
      position[i+4] = RandomNumber(0, 8);
      position[i+5] = RandomNumber(0, 100)/100;;
    }
  }
}


function StartBackground(){
  var canvas = document.getElementById('canvas');

  canvas.width = dimension[0];
  canvas.height = dimension[1];
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    RandomPosition(20);
    setInterval(DrawKernel, 100);
  }
}

function MonthOfYear(month){
  switch(month){
    case 0:
      return "January";
      break;
    case 1:
      return "February";
      break;
    case 2:
      return "March";
      break;
    case 3:
      return "April";
      break;
    case 4:
      return "May";
      break;
    case 5:
      return "June";
      break;
    case 6:
      return "July";
      break;
    case 7:
      return "August";
      break;
    case 8:
      return "September";
      break;
    case 9:
      return "Octorber";
      break;
    case 10:
      return "November";
      break;
    default:
      return "December";
    }
}


function CopyRightTime(){
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  document.write(MonthOfYear(month) + " " + year.toString());

}


function ReCalculateCanvasSize(){
	dimension[0] = document.documentElement.clientWidth;
	dimension[1] =  document.documentElement.clientHeight;
	canvas.width = dimension[0];
  	canvas.height = dimension[1];
}


window.addEventListener("resize", ReCalculateCanvasSize);
