/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { fontFamily: {
      cairo: ["Cairo", "sans-serif"],
      kufi: ["Noto Kufi Arabic", "sans-serif"],
    },
    
   
    },
    colors: {
      body: '#f9f6f2', // خلفية الجسم (لون هادئ ومحايد)
      text: '#333', // لون النصوص العادية
      heading: '#d9534f', // لون العناوين (أحمر غامق)
      white: '#fff', // اللون الأبيض
     gray:'#DBDBDB',
      purple:'#D76C82',
      // ألوان الأزرار
      primaryButton: '#d81b60', // لون زر رئيسي (وردي فاقع)
      secondaryButton: '#f8bbd0', // لون زر ثانوي (وردي فاتح)
      // ألوان شريط التنقل (Navbar)
      navbar: '#001f3f', // لون شريط التنقل (كحلي غامق)
      navbarText: '#fff', // لون النصوص في شريط التنقل
        customLightCyan: '#E3FCFB',  // سماوي فاتح مخصص
        customMint: '#BDF2D4',       // أخضر نعناعي مخصص
        customLime: '#7ADF5C',       // لون أخضر ليموني مخصص
        customDarkPurple: '#501268', // لون بنفسجي داكن مخصص
    
      // ألوان إضافية
      accent: '#ffce54', // لون مميز (ذهبي فاتح)
      border: '#e8e8e8', // لون الحدود
      block: '#000',
      // لون الكتل (أسود)
      customGreen: '#15CDA9',  // لون أخضر مخصص
      customGreen2: '#099A97', 
      customRed: '#dc3545',    // لون أحمر مخصص
      customGray: '#f8f9fa',   // لون رمادي فاتح مخصص
      customTextGray: '#6c757d',
      navy: '#023E3E',
      peach:'#FF6F61',
      navy1:'#1F509A',
     navy3:'#003161',
     pinkb:'#FFCCE1',
     bluee:'#03346E',
     redd:'#A31D1D',
     yelloww:'#F5F7B2',
     yelloww2:'#FFFDE1',
     yellow:'#F5C45E'

    },


  },
  plugins: [],
}

