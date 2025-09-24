/* vim: set ts=2 sw=2 et list number rnu : */

var anims=Array();

class animatedNode {
  defaults = {
    step: 15, /* animation step */
    b_o: 0, /* boundary opened */
    b_c: 0, /* boundary closed */
  };

  v=false; /* is visible ? */
  p=0; /* position counter */
  delta=0; /* anim stepping delta */
  c=false; /* element is entered */
  s_trig=false; /* latch for show_start */
  h_trig=false; /* latch for hide_start */

  show_start = function () {
  }

  show_step = function () {
  }

  show_cap = function () {
  }

  hide_start = function () {
  }

  hide_step = function () {
  }

  hide_cap = function () {
  }

  constructor(element, options) {
    this.e=element;
    this.options=Object.assign(this.defaults, options);

    let anim_steps=this.options.b_o-this.options.b_c;

    this.delta=(anim_steps)/this.options.step;

    this.options.rd90=90.0/(anim_steps);
    this.options.rd180=180.0/(anim_steps);
    this.options.rd270=270.0/(anim_steps);
    this.options.rd360=360.0/(anim_steps);

    this.e.addEventListener("mouseenter", (event) => {
      this.c=true;
    });
    this.e.addEventListener("mouseleave", (event) => {
      this.c=false;
    });
  }

  show() {
    if(!this.v || this.p < this.options.b_o) {
      if(!this.s_trig) {
        this.show_start();
        this.s_trig=true;
      }
      this.p+=this.delta;
      if(this.p >= this.options.b_o) {
        this.p=this.options.b_o;
        this.v=true;
        this.h_trig=false;
        this.show_step(this.p);
        this.show_cap();
      } else {
        this.show_step(this.p);
      }
    }
  }

  hide() {
    if(this.v || this.p > this.options.b_c) {
      if(!this.h_trig) {
        this.hide_start();
        this.h_trig=true;
      }
      this.p-=this.delta;
      if(this.p <= this.options.b_c) {
        this.p=this.options.b_c;
        this.v=false;
        this.s_trig=false;
        this.hide_step(this.p);
        this.hide_cap();
      } else {
        this.hide_step(this.p);
      }
    }
  }

  tick() {
    if(this.c) {
      this.show();
    } else {
      this.hide();
    }
  }
}

function animate() {
  anims.forEach((elem) => { elem.tick(); });
}

function pg_init() {
  let pp=document.querySelector("div#person-presenter");
  if(!pp) {
    console.log("failed to obtain pp");
    return;
  }

  let cl=pp.querySelector("div.cts_l");
  let cr=pp.querySelector("div.cts_r");
  let wps=pp.querySelector("div.workpose");

  let pcp_lt=pp.querySelector("div.r_pp_cover_petal_lt");
  let pcp_lb=pp.querySelector("div.r_pp_cover_petal_lb");
  let pcp_rt=pp.querySelector("div.r_pp_cover_petal_rt");
  let pcp_rb=pp.querySelector("div.r_pp_cover_petal_rb");

  // NOTE: 50 ms is about 20 fps
  setInterval(animate, 50);

  let pp_anim = new animatedNode(pp, {
    step: 8,
    b_o: 200,
    b_c: 0,
  });
  pp_anim.v=true;

  cl.style.transformOrigin=`top center ${cl.clientWidth/2+70}px`;
  cr.style.transformOrigin=`top center ${cr.clientWidth/2+70}px`;
  cl.style.transform=`rotate3d(0,1,0,90deg)`;
  cr.style.transform=`rotate3d(0,1,0,-90deg)`;

  anims.push(pp_anim);

  pp_anim.show_step = function (p) {
    rd90=this.p*this.options.rd90;
    cl.style.transform=`rotate3d(0,1,0,-${90-rd90}deg)`;
    cr.style.transform=`rotate3d(0,1,0,${90-rd90}deg)`;

    pcp_lt.style.transform=`rotate3d(1,0.009,0,${-rd90}deg)`;
    pcp_lb.style.transform=`rotate3d(1,0.009,0,${rd90}deg)`;

    pcp_rt.style.transform=`rotate3d(1,0.009,0,${-rd90}deg)`;
    pcp_rb.style.transform=`rotate3d(1,0.009,0,${rd90}deg)`;
  };

  pp_anim.show_cap = function () {
    setTimeout(function(){
      wps.style.boxShadow = `0px 0px 7px 1px white`;
    }, 170);

    setTimeout(function(){
      cl.style.boxShadow = `0px 0px 7px 1px white`;
      cr.style.boxShadow = `0px 0px 7px 1px white`;
    }, 250);
  };

  pp_anim.hide_step = function (p) {
    rd90=this.p*this.options.rd90;
    cl.style.transform=`rotate3d(0,1,0,-${90-rd90}deg)`;
    cr.style.transform=`rotate3d(0,1,0,${90-rd90}deg)`;

    pcp_lt.style.transform=`rotate3d(1,0,0,${-rd90}deg)`;
    pcp_lb.style.transform=`rotate3d(1,0,0,${rd90}deg)`;

    pcp_rt.style.transform=`rotate3d(1,0,0,${-rd90}deg)`;
    pcp_rb.style.transform=`rotate3d(1,0,0,${rd90}deg)`;
  };

  pp_anim.hide_cap = function () {
    cl.style.boxShadow = "none";
    cr.style.boxShadow = "none";
    wps.style.boxShadow = "none";
  };

  pp_anim.hide_start = function () {
    cl.style.boxShadow = "none";
    cr.style.boxShadow = "none";
    wps.style.boxShadow = "none";
  }

  let ha = new animatedNode(pp, {
    step: 30,
    b_o: 100,
    b_c: 0,
  });
  ha.v=true;
  ha.clr=Array(3);
  ha.clr[1]=130; // g
  ha.clr[2]=110; // b
  ha.hc_d=255 / ha.options.b_o;

  pp.style.backgroundBlendMode="add";

  anims.push(ha);

  ha.show_start = function () {
  };

  ha.show_step = function (p) {
    this.clr[0]=this.hc_d * this.p;
    pp.style.backgroundImage=
      `linear-gradient(0.0turn, #03161f, rgb(${this.clr[0]},${this.clr[1]},${this.clr[2]}), #03161f)`;
  };

  ha.show_cap = function () {
    setTimeout(function(){
      pp.style.backgroundImage=
        `linear-gradient(0.0turn, #03161f, rgb(255,80,50), #03161f)`;
    }, 300);
  };

  ha.hide_step = function (p) {
    this.clr[0]=this.hc_d * this.p;
    pp.style.backgroundImage=
      `linear-gradient(0.0turn, #03161f, rgba(${this.clr[0]},${this.clr[1]},${this.clr[2]}), #03161f)`;
  };

  ha.hide_cap = function () {
    pp.style.backgroundImage="none";
  };

  let wp_img=pp.querySelector("div.workpose_image");
  let wp_img_bg=wp_img.querySelector("rect#rect_bg");

  let wp_anim=new animatedNode(pp, {
    step: 15,
    b_o: 100,
    b_c: 0,
  });
  wp_anim.v=true;
  wp_anim.ssc_s=4;
  wp_anim.ssc_d=wp_anim.ssc_s / wp_anim.options.b_o;
  wp_anim.bgb_l=50;
  wp_anim.bgb_h=217;
  wp_anim.bgb_cap=wp_anim.bgb_h - wp_anim.bgb_l;
  wp_anim.bgb_d=wp_anim.bgb_l / wp_anim.options.b_o;
  wp_anim.cg_d=100 / wp_anim.options.b_o;
  wp_anim.cg_d_l=wp_anim.cg_d * 5;
  wp_anim.cg_d_m=wp_anim.cg_d * 10;
  wp_anim.cg_d_h=wp_anim.cg_d * 15;
  wp_anim.cg_p="#ddd";

  wp_img.style.backgroundImage=
    `linear-gradient(to bottom right, ${wp_anim.cg_p} 15%, white 10%, ${wp_anim.cg_p} 5%)`;
  wp_img.style.backgroundColor=`rgb(${wp_anim.bgb_h}, ${wp_anim.bgb_h}, ${wp_anim.bgb_h})`;
  wp_img.style.backgroundBlendMode="multiply";
  wp_img_bg.style.backgroundColor="transparent";
  wp_img_bg.style.fill="transparent";

  anims.push(wp_anim);

  wp_anim.show_start=function () {
    wp_img.style.boxShadow="inset 0px 0px 4px 2px";
  };

  wp_anim.show_step=function () {
    i=this.ssc_s - this.ssc_d * this.p + 2;
    wp_img.style.boxShadow=`inset 0px 0px 4px ${i}px`;

    i=this.bgb_d * this.p + this.bgb_cap;
    wp_img.style.backgroundColor=`rgb(${i}, ${i}, ${i})`;

    r=this.cg_d * this.p + this.cg_d_l;
    g=this.cg_d * this.p + this.cg_d_m;
    b=this.cg_d * this.p + this.cg_d_h;
    wp_img.style.backgroundImage=
      `linear-gradient(to bottom right, ${wp_anim.cg_p} ${r}%, white ${g}%, ${wp_anim.cg_p} ${b}%)`;
  };

  wp_anim.show_cap=function () {
    wp_img.style.boxShadow="inset 0px 0px 4px 2px";
  };

  wp_anim.hide_start=function () {
  };

  wp_anim.hide_step=function () {
    i=this.ssc_s - this.ssc_d * this.p;
    wp_img.style.boxShadow = `inset 0px 0px 4px ${i}px`;

    i=this.bgb_d*this.p+158;
    wp_img.style.backgroundColor=`rgba(${i}, ${i}, ${i})`;

    r=this.cg_d * this.p - this.cg_d_h;
    g=this.cg_d * this.p - this.cg_d_m;
    b=this.cg_d * this.p - this.cg_d_l;
    wp_img.style.backgroundImage=
      `linear-gradient(to bottom right, ${wp_anim.cg_p} ${r}%, white ${g}%, ${wp_anim.cg_p} ${b}%)`;
  };

  wp_anim.hide_cap=function () {
    wp_img.style.boxShadow="inset 0px 0px 4px 4px";
  };
}
