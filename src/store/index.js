import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    mood: window.localStorage.getItem("mood") || "darck",
    language: window.localStorage.getItem("language") || "English",
    language_list_state: "close",
    theme: window.localStorage.getItem("theme") || "orange",
    error_form_status: "close",
    error_message: {},
    delete_hw_form_status: "close",
    copy_message_status: "close",
    user: JSON.parse(window.localStorage.getItem("Ss-user")) || "",
    profile: "",
    user_type: "",
    // user_type: JSON.parse(window.localStorage.getItem("Ss-user")).user_type || "admint",
    sidBar: "close",
    information: "test",
    loading: "close",
    copy_message: { english: "Id Copyed", arabic: "تم نسخ المعرف" },
    classes: [],
    class: "",
    students: [],
    student: "",
    teachers: [],
    teacher: "",
    home_works: [],
    home_work: "",
    parents: [],
    parent: "",
    admins: [],
    admin: "",
    plans: [],
    plan: "",
    English: {
      login: {
        title: "log in to your account ...",
        label: { label_one: "Email", label_tow: "Pssword" },
        placeholder: {
          email: "Type your email here ...",
          password: "Type your password here ...",
        },
        button: "login",
      },
      home: {
        classes: {
          title: "Classes 🏫",
          link: "Get Classes",
          subject: "subject",
        },
        teachers: { title: "Teachers 👨‍🏫", link: "Get Teachers" },
        admins: { title: "Admins 🦸", link: "Get Admins" },
      },
      nav: {
        messages: {
          message_one: "Super Search ⚡",
          message_tow: "Type Id here 👇 to search",
        },
        placeholder: "Type Id here to search ...",
        button: "Search",
      },
      links: [
        { path: "/profile", title: "Profile", access: "public" },
        { path: "/", title: "Home", access: "public" },
        { path: "/classes", title: "Classes", access: "public" },
        { path: "/classes", title: "My Classes", access: "public" },
        { path: "/students", title: "Students", access: "public" },
        { path: "/teachers", title: "Teachers", access: "public" },
        { path: "/admins", title: "Admins", access: "public" },
        { path: "/parents", title: "Parents", access: "admin" },
        { path: "/plans", title: "Plans", access: "public" },
        { path: "/my/plans", title: "My Plans", access: "public" },
        { path: "/my/children", title: "My Children", access: "parent" },
        { path: "/about", title: "About us", access: "public" },
        {
          path: "/rami-web.onrender.com",
          title: "Developer",
          access: "public",
        },
      ],
      language: {
        pages: "Pages",
        title: "Language",
        arabic: "Arabic",
        english: "English",
      },
      footer: {
        message: "Hi,",
        links: [
          {
            title: "FaceBook",
            link: "https://www.facebook.com/albareoun?locale=ar_AR",
            icon: "facebook",
          },
          {
            title: "WhatsApp",
            link: "https://wa.me/0950008822",
            icon: "whatsapp",
          },
          { title: "About Us", link: "/about" },
        ],
      },
      class_page: {
        class_level: "Class level 🏫🪜🎚️ :",
        class_subject: "Subject 📚📖📑 :",
        created_by: "Created By :",
        section_title: {
          home_work: "👉 Home Works 🏚️💯🔝",
          student: " 👉 Student 👨‍🎓👩‍🎓",
        },
        result_messages: {
          home_work_message: "📍⛔😕 No Home Works 😕⛔📍",
          students: "📍⛔😕 No Students 😕⛔📍",
        },
        buttons: {
          join: "join",
          leave: "leave",
        },
      },
      copy_id: "👉",
      home_work_page: {
        page_title: "Home Work 🏚️💯🔝",
        description: "Description 📝📋 :",
        subject: "Subject 📚📖📑 :",
        images_title: "Images",
        class: "Class 🏫",
        created_by: "Created By",
        result_message: "📍⛔😕 No Images 😕⛔📍",
      },
      delete_hw_form: {
        message: "❓😳 Are you sur 😳❓",
        delete: "Delete",
        Cancel: "Cancel",
      },
      classes_page: {
        placeholder: "Type the class title here ✍️",
        page_title: "Classes Page 🏫",
        search_classes_title: "Search By title 💬👇",
        results_message: "Results 🏚️👇",
      },
      home_works_page: {
        placeholder: "Type the home work title here ✍️",
        page_title: "Home Works Page 🏫",
        search_classes_title: "Search By title 💬👇",
        results_message: "Results 🏚️👇",
      },
      home_works_component: {
        subject: "Subject 📚📖📑 :",
        class_level: "Class level 🏫🪜🎚️ :",
        created_at: "📆 :",
        images: "Images 🗃️📷 :",
      },
      student_component: {
        points: "points 🖊️📝🎊 :",
        gpa: "GPA ✅📑 :",
        class_level: "class level🏛️🪜🎚️ :",
      },
      students_page: {
        placeholder: "Type the student name here ✍️",
        page_title: "Students page 👨‍🎓",
        search_admin_name: "Search By name 💬👇",
        results_message: "Results 👨‍🎓👇",
      },
      plans_page: {
        placeholder: "Type the plan title here ✍️",
        page_title: "Plans page 📌🪃📚",
        search_admin_name: "Search By title 💬👇",
        results_message: "Results 📌🪃📚👇",
      },
      plan_page: {
        class_level: "Class level 🏫🪜🎚️ :",
        created_at: "📆 :",
        students: "students 👨‍🎓 :",
        teachers: "teachers 👨‍🏫 :",
        plan_info: "plan info :",
        day: "day :",
        subject: "Subject 📚📖📑 :",
        start: "start :",
        end: "end :",
      },
      plan_component: {
        class: "class level 🏫🪜🎚️ :",
        students: "students 👨‍🎓 :",
        teachers: "teachers 👨‍🏫 :",
        created_at: "📆 :",
      },
      admins_page: {
        placeholder: "Type the admin name here ✍️",
        page_title: "Admins page 🦸‍♂️",
        search_admin_name: "Search By name 💬👇",
        results_message: "Results 🦸‍♂️👇",
      },
      teachers_page: {
        placeholder: "Type the teacher name here ✍️",
        page_title: "Teachers page 👨‍🏫",
        search_admin_name: "Search By name 💬👇",
        results_message: "Results 👨‍🏫👇",
      },
      parents_page: {
        placeholder: "Type the parent name here ✍️",
        page_title: "Parents page 👨‍👩‍👦‍👦",
        search_admin_name: "Search By name 💬👇",
        results_message: "Results 👨‍👩‍👦‍👦👇",
      },
      teacher_component: {
        rate: "Rate ⭐ :",
        classes: "Class 🏛️ :",
        subject: "Subject 📚📖📑 :",
        editor: "Editor",
        class_level: "class level 🏫🪜🎚️ :",
        phone: "📞 :",
      },
      install_page: {
        btn_text: "Click to instll",
        message:
          "Our school: an educational edifice equipped with teaching aids, including equipped classrooms and places for educational and sports activities It was established in 2012 and includes educational stages from kindergarten to middle school.",
        note: "All rights are save",
      },
      profile: {
        gender: "Gender ⚧️ :",
        phone: "Phone 📞 :",
        exams: "Exams 📝📑🔖 :",
        points: "Points 📍 :",
        gpa: "GPA 📌 :",
        class_level: "CLass Level 🏫🪜🎚️ :",
        joind_at: "Joind In 📆 :",
        medals: [
          { gpa: 0, message: "dead 🏴‍☠️" },
          { gpa: 1, message: "good 🫡" },
          { gpa: 2, message: "very good ✊" },
          { gpa: 3, message: "persistent 📈" },
          { gpa: 3, message: "smart 🧠" },
          { gpa: 4, message: "scorer 🎯" },
          { gpa: 5, message: "legendary 🔥" },
        ],
      },
      theme: "Theme",
      mood: "Mood",
      log_out: "Log out",
      error: "Error  ...",
      loading: "Waite Pleace ...",
    },
    Arabic: {
      login: {
        title: "... تسجيل الدخول ",
        label: { label_one: "الإيميل", label_tow: "كلمة المرور" },
        placeholder: {
          email: "... اكتب الايميل هنا",
          password: "... اكتب كلمة المرور هنا",
        },
        button: "تسجيل الدخول",
      },
      home: {
        classes: { title: "🏫 الصفوف", link: "عرض الصفوف", subject: "مادة" },
        teachers: { title: " 👨‍🏫 المدرسون", link: " عرض المدرسون" },
        admins: { title: "🦸 المدراء", link: "عرض المدراء" },
      },
      nav: {
        messages: {
          message_one: " ⚡ البحث الخارق",
          message_tow: "اكتب المعرف 👇 للبحث",
        },
        placeholder: "... اكتب المعرف هنا للبحث",
        button: "بحث",
      },
      links: [
        { path: "/profile", title: "حسابي", access: "public" },
        { path: "/", title: "الصفحة الرئيسية", access: "public" },
        { path: "/classes", title: "الصفوف", access: "public" },
        { path: "/classes", title: "صفوفي", access: "public" },
        { path: "/students", title: "الطلاب", access: "public" },
        { path: "/teachers", title: "المدرسون", access: "public" },
        { path: "/admins", title: "المدراء", access: "public" },
        { path: "/parents", title: "أولياء الأمور", access: "admin" },
        { path: "/plans", title: "الخطط", access: "public" },
        { path: "/my/plans", title: "خططي", access: "public" },
        { path: "/my/children", title: "أبنائي", access: "parent" },
        { path: "/about", title: "معلومات عنا", access: "public" },
        { path: "rami-web.onrender.com", title: "المطور", access: "public" },
      ],
      language: {
        pages: "الصفحات",
        title: "اللغة",
        arabic: "عربي",
        english: "إنكليزي",
      },
      footer: {
        message: "مرحبا,",
        links: [
          {
            title: "فيسبوك",
            link: "https://www.facebook.com/albareoun?locale=ar_AR",
            icon: "facebook",
          },
          {
            title: "واتس اب",
            link: "https://wa.me/0950008822",
            icon: "whatsapp",
          },
          { title: "معلومات عنا", link: "/about" },
        ],
      },
      copy_id: "👈",
      class_page: {
        class_level: "مستوى الصف 🏫🪜🎚️ :",
        class_subject: "المادة 📚📖📑 :",
        created_by: ": تم الانشاء بواسطة",
        section_title: {
          home_work: "الوظائف🏚️💯🔝 ",
          student: "الطلاب👈👨‍🎓👩‍🎓 ",
        },
        result_messages: {
          home_work_message: "📍⛔😕 لا يوجد أي وظيفة 😕⛔📍",
          students: "📍⛔😕 لا يوجد اي طالب 😕⛔📍",
        },
        buttons: {
          join: "انضمام",
          leave: "مغادرة",
        },
      },
      home_work_page: {
        page_title: "وظيفة 🏚️💯🔝 ",
        description: " وصف الوظيفة📝📋 :",
        subject: "المادة 📚📖📑 :",
        images_title: "الصور",
        class: " الصف 🏫",
        created_by: "تم الإنشاء بواسطة",
        result_message: "📍⛔😕 لا يوجد صور 😕⛔📍",
      },
      delete_hw_form: {
        message: "❓😳 هل أنت متأكد 😳❓",
        delete: "حذف",
        Cancel: "إالغاء",
      },
      classes_page: {
        placeholder: "اكتب عنوان الصف هنا ✍️",
        page_title: "صفحة الصفوف 🏫",
        search_classes_title: "ابحث عن طريق العنوان 💬👇",
        results_message: "النتائج 🏚️👇",
      },
      home_works_page: {
        placeholder: "اكتب عنوان الوظيفة هنا ✍️",
        page_title: "صفحة الوظائف 🏫",
        search_home_work_title: "ابحث عن طريق العنوان 💬👇",
        results_message: "النتائج 🏚️👇",
      },
      home_works_component: {
        subject: "المادة 📚📖📑 :",
        class_level: "مستوى الصف 🏫🪜🎚️ :",
        created_at: "📆 :",
        images: "الصور 🗃️📷 :",
      },
      student_component: {
        points: "النقاط 🖊️📝🎊 :",
        gpa: "المعدل ✅📑 :",
        class_level: "الصف 🏛️🪜🎚️ :",
      },
      students_page: {
        placeholder: "اكتب اسم الطالب هنا ✍️",
        page_title: "صفحة الطلاب 👨‍🎓",
        search_admin_name: "البحث عن طريق الاسم 💬👇",
        results_message: "النتائج 👨‍🎓👇",
      },
      plans_page: {
        placeholder: "اكتب عنوان الخطة هنا ✍️",
        page_title: "صفحة الخطط 📌🪃📚",
        search_admin_name: "ابحث عن طريق العنوان💬👇",
        results_message: "النتائج 📌🪃📚👇",
      },
      plan_component: {
        class: "الصف 🏫🪜🎚️ :",
        students: "الطلاب 👨‍🎓 :",
        teachers: "المدرسون 👨‍🏫 :",
        created_at: "📆 :",
      },
      admins_page: {
        placeholder: "اكتب اسم المدير هنا ✍️",
        page_title: "صفحة المدراء 🦸‍♂️",
        search_admin_name: "ابحث عن طريق الاسم 💬👇",
        results_message: "النتائج 🦸‍♂️👇",
      },
      teachers_page: {
        placeholder: "اكتب اسم المدرس هنا ✍️",
        page_title: "صفحة المدرسين 👨‍🏫",
        search_admin_name: "ابحث عن طريق الاسم 💬👇",
        results_message: "النتائج 👨‍🏫👇",
      },
      parents_page: {
        placeholder: "اكتب اسم وليّ الأمر هنا ✍️",
        page_title: "صفحة أولياء الأمور 👨‍👩‍👦‍👦",
        search_admin_name: "ابحث عن طريق الاسم 💬👇",
        results_message: "النتائج 👨‍👩‍👦‍👦👇",
      },
      teacher_component: {
        rate: "التقييم ⭐ :",
        classes: "الصفوف 🏛️ :",
        subject: "المادة 📚📖📑 :",
        editor: "محرر",
        class_level: "مستوى الصف 🏫🪜🎚️ :",
        phone: "📞 :",
      },
      install_page: {
        btn_text: "انقر للتحميل",
        message:
          "مدرستنا : صرح تعليمي مجهز بوسائل التعليم من فصول مجهزة و أماكن للأنشطة التعليمية و الرياضية تأسست عام ٢٠١٢ و تتضمن مراحل التعليم من مرحلة رياض الأطفال إلى المرحلة الاعدادية.",
        note: "جميع الحقوق محفوظة",
      },
      profile: {
        gender: "النوع ⚧️ :",
        phone: "الهاتف 📞 :",
        exams: "الامتحانات 📝📑🔖 :",
        points: "النقاط 📍 :",
        gpa: "المعدل 📌 :",
        class_level: "الصف 🏫🪜🎚️ :",
        joind_at: "انضم في 📆 :",
        medals: [
          { gpa: 0, message: "ميت 🏴‍☠️" },
          { gpa: 1, message: "جيد 🫡" },
          { gpa: 2, message: "جيد جدا ✊" },
          { gpa: 3, message: "مثابر 📈" },
          { gpa: 3, message: "ذكي 🧠" },
          { gpa: 4, message: "هداف 🎯" },
          { gpa: 5, message: "اسطوري 🔥" },
        ],
      },
      theme: "السمات",
      mood: "الوضع",
      log_out: "تسجيل الخروج",
      error: "... خطأ",
      loading: "الرجاء الإنتظار ...",
    },
    APIs: {
      login: {
        Admin: "https://rrr-zb8x.onrender.com/api/v1/admin/login",
        Teacher: "https://rrr-zb8x.onrender.com/api/v1/teacher/login",
        Student: "https://rrr-zb8x.onrender.com/api/v1/student/login",
        Parent: "https://rrr-zb8x.onrender.com/api/v1/parent/login",
      },
      classes: {
        get_all: "https://rrr-zb8x.onrender.com/api/v1/class/get/all",
        get_one: "https://rrr-zb8x.onrender.com/api/v1/class/get/one",
        super: {
          create: "https://rrr-zb8x.onrender.com/api/v1/super/class/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/super/class/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/super/class/update",
        },
        admin: {
          create: "https://rrr-zb8x.onrender.com/api/v1/admin/class/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/admin/class/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/admin/class/update",
        },
        teachers: {
          create: "https://rrr-zb8x.onrender.com/api/v1/teacher/class/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/teacher/class/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/teacher/class/update",
        },
        join_leave: {
          join: "https://rrr-zb8x.onrender.com/api/v1/class/join",
          leave: "https://rrr-zb8x.onrender.com/api/v1/class/leave",
        },
      },
      teachers: {
        get_all: "https://rrr-zb8x.onrender.com/api/v1/teacher/get/all",
        get_one: "https://rrr-zb8x.onrender.com/api/v1/teacher/get/one",
        super_admin: {
          teacher_create:
            "https://rrr-zb8x.onrender.com/api/v1/super/teacher/create",
          teacher_delete:
            "https://rrr-zb8x.onrender.com/api/v1/super/teacher/delete",
          teacher_update:
            "https://rrr-zb8x.onrender.com/api/v1/super/teacher/update",
        },
        admin: {
          teacher_create:
            "https://rrr-zb8x.onrender.com/api/v1/admin/teacher/create",
          teacher_delete:
            "https://rrr-zb8x.onrender.com/api/v1/admin/teacher/delete",
          teacher_update:
            "https://rrr-zb8x.onrender.com/api/v1/admin/teacher/update",
        },
      },
      admins: {
        get_all: "https://rrr-zb8x.onrender.com/api/v1/admin/get/all",
        get_one: "https://rrr-zb8x.onrender.com/api/v1/admin/get/one",
        super: {
          create: "https://rrr-zb8x.onrender.com/api/v1/admin/get/all",
          delete: "https://rrr-zb8x.onrender.com/api/v1/super/admin/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/super/admin/create",
        },
      },
      students: {
        get_all: "https://rrr-zb8x.onrender.com/api/v1/student/get/all",
        get_one: "https://rrr-zb8x.onrender.com/api/v1/student/get/one",
      },
      parents: {
        get_all: "https://rrr-zb8x.onrender.com/api/v1/parent/get/all",
        get_one: "https://rrr-zb8x.onrender.com/api/v1/parent/get/one",
      },
      home_works: {
        get_home_work_all: "https://rrr-zb8x.onrender.com/api/v1/hw/get/all",
        get_home_work_one: "https://rrr-zb8x.onrender.com/api/v1/hw/get/one",
        super: {
          create: "https://rrr-zb8x.onrender.com/api/v1/super/hw/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/super/hw/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/super/hw/update",
        },
        admin: {
          create: "https://rrr-zb8x.onrender.com/api/v1/admin/hw/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/admin/hw/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/admin/hw/update",
        },
        teacher: {
          create: "https://rrr-zb8x.onrender.com/api/v1/teacher/hw/create",
          delete: "https://rrr-zb8x.onrender.com/api/v1/teacher/hw/delete",
          update: "https://rrr-zb8x.onrender.com/api/v1/teacher/hw/update",
        },
      },
      plans: {
        get_all: "https://rrr-zb8x.onrender.com/api/v1/plan/get/all",
        get_one: "https://rrr-zb8x.onrender.com/api/v1/plan/get/one",
      },
    },
  },
  getters: {},
  mutations: {
    // change mood method
    changeMood(state) {
      state.mood = state.mood == "darck" ? "light" : "darck";
      console.log(state.mood);
      window.localStorage.setItem("mood", state.mood);
    },

    // open & close the sid bar method
    changeSidBarStatus(state) {
      state.sidBar = state.sidBar == "close" ? "open" : "close";
      console.log(state.sidBar);
    },

    // open & closethe language list state
    changelanguage_list_state(state) {
      state.language_list_state =
        state.language_list_state == "close" ? "open" : "close";
    },

    // open || close the error form
    ChangeErrorFormStatus(state) {
      state.error_form_status =
        state.error_form_status == "close" ? "open" : "close";
    },

    // open or close the verify delete home work form
    OpenOrCloseDeleteHW(state) {
      state.delete_hw_form_status =
        state.delete_hw_form_status == "close" ? "open" : "close";
    },
  },
  actions: {
    // log out admin
    LogOut() {
      window.localStorage.removeItem("Ss-user");
      window.location.reload();
    },

    // get classes
    async getClasses() {
      try {
        // to start the loadin animation
        this.loading = "open";

        await axios
          .get("https://rrr-zb8x.onrenders.com/api/v1/class/get/all")
          .then((response) => {
            // set the data to stor classes
            this.classes = response.data.classes_data;
          })
          .catch((error) => {
            console.log(error);
            // to stop the loading animation
            this.loading = "close";

            // to set the reqeust's error message to error message var in store
            this.erorr_message = error.message;

            // to open the error form
            this.error_form_status = "open";
          });

        // to stop the loadin animation
        this.loading = "close";
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});
