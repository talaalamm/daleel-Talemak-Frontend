import React from "react";
import About1 from "../images/about2.jpeg";
const AboutUs = () => {
  return (
    <div className="bg-yellow-100 p-10 mt-14" id="about" font-cairo>
      {/* صفحة من نحن */}
      <h1 className="text-center text-primaryButton text-4xl  mb-8 font-cairo">عن دليل تعليمك</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        {/* الرؤية */}
        <div className=" border-pinkb p-6 rounded-lg shadow-md  border-2 border-body text-navbar outline-none  rounded-lg shadow-md transition-transform duration-300 hover:scale-105 focus:ring-blue-500 font-cairo">
          <h2 className="text-xl  text-customGreen2  mb-4 bg-white text-center py-2 font-cairo">
            الرؤية
          </h2>
          <p>
          “ثقتكم أساس نجاحنا”، ونؤمن بأن العمل الجماعي والابتكار هما أساس تحقيق الإنجازات. كما نحرص على اختيار أفضل المؤسسات التعليمية بعناية، لنكون شركاء حقيقيين في مسيرة النجاح
          </p>
        </div>
        {/* الرسالة */}
        <div className=" border-pinkb p-6 rounded-lg shadow-md  border-2 border-body text-navbar outline-none  rounded-lg shadow-md transition-transform duration-300 hover:scale-105 focus:ring-blue-500 font-cairo">
          <h2 className="text-xl text-customGreen2  text-blue-900  mb-4 bg-white text-center py-2 font-cairo ">
            رسالتنا
          </h2>

          <p>
          نسعى بكل شغف إلى تقديم خدمات واستشارات إلكترونية مبتكرة في مجال التعليم، حيث نعمل على توفير الحلول التقنية بأفضل وأحدث الأساليب التكنولوجية.
هدفنا هو تمكين عملائنا من توفير الوقت والجهد، وتحقيق نتائج فورية تلبي توقعاتهم وتساهم في تطوير العملية التعليمية.
نؤمن بأن الابتكار هو الأساس، والتكنولوجيا هي الوسيلة لتحقيق التغيير الإيجابي.
          </p>
        </div>
        {/* القيمة */}
        <div className=" border-pinkb p-6 rounded-lg shadow-md  border-2 border-body text-navbar outline-none  rounded-lg shadow-md transition-transform duration-300 hover:scale-105 focus:ring-blue-500 font-cairo">
          <h2 className="text-xl text-customGreen2 text-blue-900  mb-4 bg-white text-center py-2 font-cairo">
            قيمنا
          </h2>

          <p>
          النزاهة والاخلاق والمصداقية والشفافية والمهنية في التعامل مع الجميع , كما اننا نسعى لتشجيع التفاعل الإيجابي بين المدارس والمجتمع من خلال تسليط الضوء على نقاط القوة وفرص التطوير، مع الالتزام بتقديم تجربة استخدام سلسة ومتكاملة تعكس احتياجات وتطلعات الجميع.
          </p>
        </div>
      </div>
      {/* الشعار */}
      <div className="grid grid-cols-2 ">
        <div className="mt-10 border-pinkb   p-6 rounded-lg   border-2 border-body text-navbar outline-none  rounded-lg shadow-md transition-transform duration-300 hover:scale-105 focus:ring-blue-500 font-cairo">
          <h2 className="text-xl   text-customGreen2  text-blue-900 mb-4 bg-white text-center py-2 font-cairo ">
            شعارنا
          </h2>

          <p class="separate-lines">
          1- ثقتكم أساس تفوقنا ونسعى لانتقاء افضل المدارس<br />
          <br />
        2- دليل المدارس مستشارك لاختيار مدرسة ابنائك<br />
        <br />
        3- دليل المدارس يخطط معك لمستقبل افضل لأبنائك<br />
        <br />
        4- دليل المدارس مستشارك لتعليم ابنائك<br />
        <br />
        5- دليل المدارس مستشارك في اختيار مدرسة تقدم لأبنائك بيئة تعليمية أمنة وصحية<br />
        <br />
        6- دليل المدارس يساعدك في تحديد مسارك الصحيح
</p>
        </div>
        <div className="my-10 flex justify-center items-center px-20">
          <img src={About1} alt="" className="h-60 w-full mt-20" />
        </div>
      </div>
      {/* نصائح */}
      <div className="mt-10 p-6 border-customGreen2 rounded-lg shadow-md  border-2 border-body text-navbar outline-none   transition-transform duration-300 hover:scale-105 focus:ring-blue-500 font-cairo">
        <h2 className="text-xl  text-customGreen2  mb-4 bg-white text-center py-2">
          {" "}
          نصائح دليل تعليمات لاختيار المدرسة الأنسب لأبنائك
        </h2>

        
          <ul>
            <li> 🎯اختار المدرسة التي إيجابياتها ومميزاتها أكثر من سلبياتها ( حيث لا توجد مدرسة كاملة المواصفات ) .</li>
            <li> 🎯اختار المدرسة التي تطور من نفسها وتسعي لحل مشاكلها وإنهاء سلبياتها .
            </li>
            <li> 🎯بعد البحث والاستماع لتجارب الأخرين يجب زيارة المدرسة بنفسك للحكم عليها وتحديد القرار النهائي في الاختيار .
            </li>
<li> 🎯عزيزي ولي الأمر يجب الاستفادة من تجارب أولياء الأمور من خلال سرد تجاربهم الحقيقية. </li>
 </ul>
        
      </div>
    </div>
  );
};

export default AboutUs;
