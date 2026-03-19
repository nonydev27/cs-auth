import { useState, useEffect } from 'react';
import './App.css';

// Excel data - Admin: Reference numbers with names
const EXCEL_DATA = [
  { "Reference Number": "20891714", "Name": "Freda NSOBILA" },
  { "Reference Number": "20982978", "Name": "Godlove ASANTE DARKWAH" },
  { "Reference Number": "20986347", "Name": "Evelyn Twumasiwaa BOADI" },
  { "Reference Number": "21010233", "Name": "Risaalah Amoakowaa WILSON" },
  { "Reference Number": "21012189", "Name": "Charity Tindan MAMBULIYA" },
  { "Reference Number": "21029199", "Name": "Esther Boateng ASAMOAH" },
  { "Reference Number": "21038576", "Name": "Jessica Owusu BONA" },
  { "Reference Number": "21073981", "Name": "Victoria Anyetebawein ALUETE" },
  { "Reference Number": "21074324", "Name": "Eyram Adzo AMEVEDZI" },
  { "Reference Number": "21074687", "Name": "Ellina Tabua OSEI" },
  { "Reference Number": "21075842", "Name": "Priscilla TAY" },
  { "Reference Number": "21079885", "Name": "Francisca Nana Yaa Nyarko BOAKYE" },
  { "Reference Number": "21079912", "Name": "Boreche Salma MAHAMA" },
  { "Reference Number": "21080729", "Name": "Abigail Dankwaa Akosua AKOSAH" },
  { "Reference Number": "21081796", "Name": "Ethel Asaaba GLIGAH" },
  { "Reference Number": "21081909", "Name": "Harriet Benewaa APPIAH" },
  { "Reference Number": "21082614", "Name": "Wendy Adjoa ESSUMAN" },
  { "Reference Number": "21082695", "Name": "Chelsy Ohenewaa ABLORDEPPEY" },
  { "Reference Number": "21083066", "Name": "Grace Onyinah Adwapah OPOKU" },
  { "Reference Number": "21083500", "Name": "Lawrencia Yemoley YEMOH" },
  { "Reference Number": "21083753", "Name": "Jennifer Tietere BOMBEY" },
  { "Reference Number": "21084061", "Name": "Ama Dansoa KUSI" },
  { "Reference Number": "21084140", "Name": "Nana Akua Kyei KUSI" },
  { "Reference Number": "21085101", "Name": "Davida Eyram CHAMAH" },
  { "Reference Number": "21085213", "Name": "Jamila ABUBAKAR" },
  { "Reference Number": "21085254", "Name": "Hibah Maatenso ZAKARIA" },
  { "Reference Number": "21085341", "Name": "Deseree Dzigbordi HORGLE" },
  { "Reference Number": "21085443", "Name": "Ohemaa Biritwum GYAMFI" },
  { "Reference Number": "21085694", "Name": "Shidaa Okaikor ANNAN" },
  { "Reference Number": "21090467", "Name": "Edna Aba ARTHUR-QUANSAH" },
  { "Reference Number": "21090694", "Name": "Shila BOAHEN" },
  { "Reference Number": "21098440", "Name": "Marvelle Ohenewah OHENE" },
  { "Reference Number": "21100176", "Name": "Nana Ama Oforiwaa ASIAMAH" },
  { "Reference Number": "21100310", "Name": "Salma Baba AMADU" },
  { "Reference Number": "21100746", "Name": "Mirabelle Eyram Ama KUMAH" },
  { "Reference Number": "21101931", "Name": "Abigail Naa Adoley HERMANN" },
  { "Reference Number": "21102068", "Name": "Irene Fafali GBADAGO" },
  { "Reference Number": "21102596", "Name": "Wendy Atampoka ABAGNA" },
  { "Reference Number": "21104779", "Name": "Blessing AMANING - KWARTENG" },
  { "Reference Number": "21105282", "Name": "Naa Dzableorkor Dromoh ABBEY" },
  { "Reference Number": "21105492", "Name": "Priscilla Asenso ANOKYE" },
  { "Reference Number": "21106165", "Name": "Laureen LARYEA" },
  { "Reference Number": "21106238", "Name": "Joyceline MAHAMA" },
  { "Reference Number": "21106388", "Name": "Ama Achiaa OSEI BONSU" },
  { "Reference Number": "21107094", "Name": "Georgette ADU-GYAMFI" },
  { "Reference Number": "21108169", "Name": "Ryanna PAINTSIL" },
  { "Reference Number": "21110202", "Name": "Maame Afia Asantewaa ASIAMAH" },
  { "Reference Number": "21111484", "Name": "Josephine Enyonam KPOTOSU" },
  { "Reference Number": "21111548", "Name": "Ruwaida Anas ABBAS" },
  { "Reference Number": "21113154", "Name": "Nihad Malba MOHAMMED NAFIQ" },
  { "Reference Number": "21113540", "Name": "Fulera Ahamed COMRIE" },
  { "Reference Number": "21116343", "Name": "Ewura Ama MENSAH" },
  { "Reference Number": "21117639", "Name": "Roseline KOFFIE" },
  { "Reference Number": "21117984", "Name": "Maame Efua Nyakoma OBENG" },
  { "Reference Number": "21119172", "Name": "Afua Aboaakyerewaa ASIAMAH" },
  { "Reference Number": "21120543", "Name": "Ann-Janelle Naa Ahimah QUAYE" },
  { "Reference Number": "21120828", "Name": "Hikmat Ajaansuma JAMALDEEN" },
  { "Reference Number": "21121154", "Name": "Rebecca Frimpomaa ANTOBRE" },
  { "Reference Number": "21121437", "Name": "Afia Pokua NIMAKO" },
  { "Reference Number": "21121635", "Name": "Christabel ADDAI" },
  { "Reference Number": "21122666", "Name": "Blessing Agyemang OBENG" },
  { "Reference Number": "21124355", "Name": "Mariya Kanyiti HUSSEIN" },
  { "Reference Number": "21124400", "Name": "Nana Afia OPPONG" },
  { "Reference Number": "21124478", "Name": "Eliana Nyamedze Ntsiamoawah ESUON" },
  { "Reference Number": "21124665", "Name": "Bernita TOTI" },
  { "Reference Number": "21124731", "Name": "Maame Yaa Pokua OWUSU" },
  { "Reference Number": "21128190", "Name": "Insuaf ABDUL-KADIRI" },
  { "Reference Number": "21130705", "Name": "Freda Tuafo ARTHUR" },
  { "Reference Number": "21131167", "Name": "Chantelle Mma Kapura AKANTUSHIE" },
  { "Reference Number": "21132096", "Name": "Linda AMOH" },
  { "Reference Number": "21132686", "Name": "Gesella Fosuah SARFO" },
  { "Reference Number": "21132906", "Name": "Vida Mansa TUMAKU" },
  { "Reference Number": "21136815", "Name": "Joy Chinaza ANYANSO" },
  { "Reference Number": "21137296", "Name": "Belinda ACQUAH" },
  { "Reference Number": "21137361", "Name": "Viking Owusua DJAN" },
  { "Reference Number": "21137562", "Name": "Aisha AMADU" },
  { "Reference Number": "21137783", "Name": "Mansura Is-Haq NAAMULEH" },
  { "Reference Number": "21137957", "Name": "Nana Ahwenee Gyaama OPPONG - AGYARE" },
  { "Reference Number": "21140398", "Name": "Manuella Twenewaa ACHEAMPONG" },
  { "Reference Number": "21141649", "Name": "Nissigel Oforiwaah ANDERSON" },
  { "Reference Number": "21142843", "Name": "Stephanie Seyram Dede OFORI" },
  { "Reference Number": "21144001", "Name": "Leona Frimpomaa AGYEKUM-BOADU" },
  { "Reference Number": "21144055", "Name": "Ernestina Dankwah BOAKYE" },
  { "Reference Number": "21145141", "Name": "Elizabeth Esseba ANSAH" },
  { "Reference Number": "21146740", "Name": "Wuni-Tima Randa ISSAH" },
  { "Reference Number": "21148085", "Name": "Hilda Okyem AKOMEAH" },
  { "Reference Number": "21148878", "Name": "Roselyn Kyerewaa FRIMPONG" },
  { "Reference Number": "21150533", "Name": "Louisa Afua MINTAH" },
  { "Reference Number": "21150796", "Name": "Lordina Animah AMPONG" },
  { "Reference Number": "21151366", "Name": "Edith DZIWORNU" },
  { "Reference Number": "21151628", "Name": "Angelyn Teiko Deladem LEIGH" },
  { "Reference Number": "21152214", "Name": "Nana Aba Nyameyie ANSAH" },
  { "Reference Number": "21155037", "Name": "Firdaus Ofosuwaa Ahmed ESSEL" },
  { "Reference Number": "21161356", "Name": "Phillipa Nuamah ADJEI" },
  { "Reference Number": "21163369", "Name": "Elizabeth Gyamfuaah DOMFEH" },
  { "Reference Number": "21163438", "Name": "Nora Boateng ASIEDU" },
  { "Reference Number": "21163686", "Name": "Vera Boateng ASIEDU" },
  { "Reference Number": "21164065", "Name": "Margaret AMFO-OTU" },
  { "Reference Number": "21164328", "Name": "Eyram Ami GAHDI" },
  { "Reference Number": "21165423", "Name": "Akosua Mpomaa ADDAI" },
  { "Reference Number": "21165815", "Name": "Sirina Safianu ABBAS" },
  { "Reference Number": "21166546", "Name": "Abigail ADUSEI" },
  { "Reference Number": "21167328", "Name": "Taslima ABDUL SAMED" },
  { "Reference Number": "21170635", "Name": "Angel Favour Chiamaka ONWE" },
  { "Reference Number": "21176264", "Name": "Blessing Baffoa HACKMAN" },
  { "Reference Number": "21183639", "Name": "Apoasan AKOLOGO" },
  { "Reference Number": "21183779", "Name": "Vanessa OWARE" },
  { "Reference Number": "21184622", "Name": "Raina-Pryce AYE-KUMI" },
  { "Reference Number": "21184986", "Name": "Eunice AKOTO BOAKYE SERWAA" },
  { "Reference Number": "21186472", "Name": "Jessica ATTUAH" },
  { "Reference Number": "21187287", "Name": "Etornam Svetlana Ama AMPIAH" },
  { "Reference Number": "21187748", "Name": "Hannah Blessing ASARE-SINTIM" },
  { "Reference Number": "21476047", "Name": "Oluchi Favour IBERI" },
  { "Reference Number": "20869850", "Name": "Abdul Rashid ADAMS" },
  { "Reference Number": "20875255", "Name": "Leaderson KUSSIBA" },
  { "Reference Number": "20921937", "Name": "Owusu Daniel ADJEI" },
  { "Reference Number": "20924335", "Name": "Mustapha Baba YUSUF" },
  { "Reference Number": "20936502", "Name": "Evans BAAH-KUMI" },
  { "Reference Number": "20961935", "Name": "Stephan Appiah ATOBRAH" },
  { "Reference Number": "20970068", "Name": "Abdul Basit MANSURU" },
  { "Reference Number": "20970235", "Name": "Samuel Onmanbeh ZAMBIL" },
  { "Reference Number": "20970911", "Name": "Nana Adu OMARI" },
  { "Reference Number": "20974223", "Name": "Joshua ADDO" },
  { "Reference Number": "20979315", "Name": "Fatawu Sumaila AYAABA" },
  { "Reference Number": "20979912", "Name": "Edward Kofi Junior ADDO" },
  { "Reference Number": "20980497", "Name": "Wilfred Kojo GBEDZE" },
  { "Reference Number": "20981627", "Name": "Zainul Abideen SAEED" },
  { "Reference Number": "20982441", "Name": "Abdul Aziz KARIM" },
  { "Reference Number": "20982696", "Name": "Pius Darko OTUTU" },
  { "Reference Number": "20984356", "Name": "Emmanuel Adade OSEI" },
  { "Reference Number": "20986574", "Name": "Caleb ADOMPREH" },
  { "Reference Number": "20986795", "Name": "Clifford EFFAH" },
  { "Reference Number": "20987764", "Name": "Abdul Lateef AMPAH" },
  { "Reference Number": "20987871", "Name": "Samuel Kofi ASOMANING" },
  { "Reference Number": "20991242", "Name": "Isaac Ayimbissa AKEY" },
  { "Reference Number": "20992632", "Name": "Caleb Owusu KYERE" },
  { "Reference Number": "20996559", "Name": "Kwaku Adom Osei BOAMA SEFA" },
  { "Reference Number": "20999186", "Name": "Hakeem ADAM" },
  { "Reference Number": "21002457", "Name": "Joshua Elorm LOGOSU" },
  { "Reference Number": "21006286", "Name": "Vincent Busia AMEYAW" },
  { "Reference Number": "21006469", "Name": "Harris Malgu YUSSIF MOHAMMED" },
  { "Reference Number": "21012642", "Name": "Abdul-Waris Wumbei ABUKARI" },
  { "Reference Number": "21013174", "Name": "Alexander ASARE-APPIAH" },
  { "Reference Number": "21015993", "Name": "Nana Yaw SARPONG" },
  { "Reference Number": "21016670", "Name": "Jeffery Edinam KUDAYAH" },
  { "Reference Number": "21017129", "Name": "Desmond ADJEI" },
  { "Reference Number": "21019924", "Name": "Akwesi Victor AGYEI-BOAHENE" },
  { "Reference Number": "21022974", "Name": "Edwin King Alabadek AKPELIME" },
  { "Reference Number": "21024025", "Name": "James Twum YEBOAH" },
  { "Reference Number": "21025200", "Name": "Julian FAMIYE-QUASIE" },
  { "Reference Number": "21026377", "Name": "Essel Kofi ERIC" },
  { "Reference Number": "21027127", "Name": "Kojo TUFUOR-GYAMFI" },
  { "Reference Number": "21027591", "Name": "Perry AMOO-ADEGOKE" },
  { "Reference Number": "21028918", "Name": "Jeffery Anamah OBOUR" },
  { "Reference Number": "21029311", "Name": "Alwin Adusei TENKORANG" },
  { "Reference Number": "21030454", "Name": "Kwabena Mensah SARPONG" },
  { "Reference Number": "21031648", "Name": "Joseph Yiadom BOAKYE" },
  { "Reference Number": "21033251", "Name": "Kojo Gyimah ANTWI-BOASIAKO" },
  { "Reference Number": "21033715", "Name": "Van-Ike Boye ABBEY" },
  { "Reference Number": "21034470", "Name": "Klortia Okai ANKU" },
  { "Reference Number": "21036779", "Name": "Yasir Basekiyya IDDRISU" },
  { "Reference Number": "21048800", "Name": "Isaac GLOVER LARTEY" },
  { "Reference Number": "21071497", "Name": "Jermaine OHENE-KARIKARI" },
  { "Reference Number": "21071529", "Name": "Barima Sarpong AFRIYIE" },
  { "Reference Number": "21071663", "Name": "Israel Kevin ANABA" },
  { "Reference Number": "21071896", "Name": "Nana Kwaku Dampare AGYARKO" },
  { "Reference Number": "21072177", "Name": "Benjamin Adotey ALLOTEY" },
  { "Reference Number": "21072287", "Name": "Edward Acquah KORANKYE" },
  { "Reference Number": "21074118", "Name": "Alex Nkansah ACHEAMPONG" },
  { "Reference Number": "21074133", "Name": "Frederick OSEM" },
  { "Reference Number": "21074212", "Name": "Kwabena Acheampong DOMFEH" },
  { "Reference Number": "21074452", "Name": "Raphael Delasi MENYAWOVOR" },
  { "Reference Number": "21074570", "Name": "Paakow Ayeyi BONFUL" },
  { "Reference Number": "21074612", "Name": "Boakye Jesse APPIAGYEI" },
  { "Reference Number": "21074830", "Name": "Daniel Yeboah NORTEY" },
  { "Reference Number": "21074835", "Name": "Iddriss SAEED" },
  { "Reference Number": "21074879", "Name": "Felix Boateng AGYEMANG" },
  { "Reference Number": "21074881", "Name": "Emmanuel Kwame TWENEBOAH" },
  { "Reference Number": "21075010", "Name": "Shedal MOHAMMED" },
  { "Reference Number": "21075168", "Name": "Emmanuel Kwame KEWA" },
  { "Reference Number": "21075502", "Name": "George SARFO" },
  { "Reference Number": "21075565", "Name": "Abdul-Sobur IBRAHIM" },
  { "Reference Number": "21075765", "Name": "Kwadwo Ofori AGYEMANG" },
  { "Reference Number": "21075908", "Name": "Roland Nana Osei KORANTENG" },
  { "Reference Number": "21076134", "Name": "Louis Aparkwon SANYENNI" },
  { "Reference Number": "21077083", "Name": "Samuel OKYERE" },
  { "Reference Number": "21077578", "Name": "Kelvin ARTHUR" },
  { "Reference Number": "21077738", "Name": "Shadrack Darko LARBIE" },
  { "Reference Number": "21078045", "Name": "Abdul Salam Nalor MOHAMMED" },
  { "Reference Number": "21078081", "Name": "Nicholas Vielubadaar ETENYE" },
  { "Reference Number": "21078505", "Name": "Ebenezer Afriyie NYARKO" },
  { "Reference Number": "21078642", "Name": "Benjamin Kpormorne AMENUMEY" },
  { "Reference Number": "21079327", "Name": "Benedict Okyere ODURO" },
  { "Reference Number": "21079470", "Name": "Asadu Kwakye AMPADU" },
  { "Reference Number": "21079474", "Name": "Chris Mawutor KLIDOH" },
  { "Reference Number": "21079936", "Name": "Franklove Mintah BOATENG" },
  { "Reference Number": "21080097", "Name": "Stan BADU" },
  { "Reference Number": "21080121", "Name": "Kelvin Xorse AFUN" },
  { "Reference Number": "21081142", "Name": "Kwabena Awisi AWUAH" },
  { "Reference Number": "21081219", "Name": "Jonathan Jackson ODURO" },
  { "Reference Number": "21081299", "Name": "Montel Franklyn ASARE ANSA" },
  { "Reference Number": "21081893", "Name": "Peter Noel Senyo Kojo NUNEKPEKU" },
  { "Reference Number": "21082041", "Name": "Nana Owusu BOATENG" },
  { "Reference Number": "21082104", "Name": "John Kwame Frempong YEBOAH" },
  { "Reference Number": "21082160", "Name": "Denzil Kobena Paddy COFIE" },
  { "Reference Number": "21082299", "Name": "Gareth EDU MARTEY" },
  { "Reference Number": "21082386", "Name": "Jude Mensah KANKAM" },
  { "Reference Number": "21082578", "Name": "Jude Sedem FIADZAWOO" },
  { "Reference Number": "21082634", "Name": "King-Frederick AKYEA" },
  { "Reference Number": "21082741", "Name": "Abubakari Kassim AMISSAH" },
  { "Reference Number": "21082752", "Name": "Immanuel Elikplim Kwao DZITSE" },
  { "Reference Number": "21082780", "Name": "Elliot Nii Okaidja ANNAN" },
  { "Reference Number": "21082781", "Name": "Yakubu ABDALLAH" },
  { "Reference Number": "21082841", "Name": "Prince Dwomoh OWUSU" },
  { "Reference Number": "21082904", "Name": "Claude Kweku BENTUM" },
  { "Reference Number": "21083395", "Name": "Benedict Noble Nyame ESHUN" },
  { "Reference Number": "21083605", "Name": "Jonathan Kojo Junior FORSON" },
  { "Reference Number": "21083615", "Name": "Samuel Kekeli MAWUSI" },
  { "Reference Number": "21083635", "Name": "Oswell BOAKYE ACHEAMPONG" },
  { "Reference Number": "21084198", "Name": "Mohammed Baki ABBAN" },
  { "Reference Number": "21084557", "Name": "Pascal Semenyo Kokou AGLAH" },
  { "Reference Number": "21084603", "Name": "Bismark AZUMAH" },
  { "Reference Number": "21084615", "Name": "Ben Brako KWARTENG" },
  { "Reference Number": "21085281", "Name": "Joseph Wunnimi AMUQUANDOH" },
  { "Reference Number": "21085548", "Name": "Mark Boakye GYAMFI" },
  { "Reference Number": "21085618", "Name": "Adams ABDUL-FATAWU" },
  { "Reference Number": "21090020", "Name": "Myron Nana Kwesi GYAMFI" },
  { "Reference Number": "21090546", "Name": "Papa Kwadwo OPOKU-ABREFA-BUSIA" },
  { "Reference Number": "21090782", "Name": "Jesse Kwadwo GYAMFI" },
  { "Reference Number": "21090783", "Name": "Michael AFFUM" },
  { "Reference Number": "21090937", "Name": "Wolfram Ayensu OFORI" },
  { "Reference Number": "21091009", "Name": "Alfred Eyram QUIST" },
  { "Reference Number": "21091078", "Name": "Simon Yaw Prempeh COLE" },
  { "Reference Number": "21091205", "Name": "Vincent Nyiewo SIE" },
  { "Reference Number": "21091249", "Name": "Prince Kweku OHEMENG" },
  { "Reference Number": "21096971", "Name": "Rafiq OKYERE" },
  { "Reference Number": "21097693", "Name": "Joseph OPOKU" },
  { "Reference Number": "21098284", "Name": "Tarriq Suhuyeni SUMANI" },
  { "Reference Number": "21098429", "Name": "David Kwadwo Frimpong ABABIO" },
  { "Reference Number": "21098569", "Name": "Ibrahim Saha ISMAILA" },
  { "Reference Number": "21098836", "Name": "Kwadwo Osei APPIAH" },
  { "Reference Number": "21098946", "Name": "Jeffrey Peter-Gyimah DANSO" },
  { "Reference Number": "21099242", "Name": "Isaac Nicholas Kwasi YEBOAH" },
  { "Reference Number": "21099302", "Name": "Francis Kwame Appiah BOADI" },
  { "Reference Number": "21099435", "Name": "Mwinbemasim Kizi AKUDAGO" },
  { "Reference Number": "21099504", "Name": "Blessing UMBOREANAM" },
  { "Reference Number": "21099527", "Name": "Newlove Patterson DOGLO" },
  { "Reference Number": "21099533", "Name": "Benjamin Nartey KWEKU-DUAH" },
  { "Reference Number": "21099714", "Name": "Samuel Nana Ekow Boadzi ARKO" },
  { "Reference Number": "21100051", "Name": "Gideon Peasah ANIM-AWUAH" },
  { "Reference Number": "21100257", "Name": "Douglas ADJEI" },
  { "Reference Number": "21100402", "Name": "Nicholas Esmond FORSON" },
  { "Reference Number": "21100429", "Name": "Kan Dapaah OWUSU" },
  { "Reference Number": "21100489", "Name": "Clifford Tuffour ASANTE" },
  { "Reference Number": "21100505", "Name": "Jesse Tetteh TOTIMEH" },
  { "Reference Number": "21100721", "Name": "Clifford Amponsah OPPONG" },
  { "Reference Number": "21100828", "Name": "Michael Kofi DOE" },
  { "Reference Number": "21100996", "Name": "Selorm Ebenezer Yao GAWUGAH" },
  { "Reference Number": "21101023", "Name": "Ayman Maltiti ABDUL RAUF" },
  { "Reference Number": "21101401", "Name": "Noble Nyameyenokwarfo WILLIAMS" },
  { "Reference Number": "21101523", "Name": "Sebastian Yayra Komla EGEH" },
  { "Reference Number": "21101783", "Name": "Victor AKHAREI" },
  { "Reference Number": "21101825", "Name": "Felix ARTHUR" },
  { "Reference Number": "21102065", "Name": "Caleb FRIMPONG" },
  { "Reference Number": "21102246", "Name": "Ronny Paul Asante ACHEAMPONG" },
  { "Reference Number": "21102342", "Name": "Derrick Makafui ZEVOR" },
  { "Reference Number": "21102633", "Name": "Kofi Akuamoah BOATENG" },
  { "Reference Number": "21102706", "Name": "Denzel Nii Lantei ALEMAH" },
  { "Reference Number": "21103008", "Name": "Kwadwo Banafo ABBEYQUAYE" },
  { "Reference Number": "21103078", "Name": "George Hagan ASAMOAH" },
  { "Reference Number": "21103432", "Name": "Micheal Nana Kofi Siaw ASAMOAH" },
  { "Reference Number": "21103672", "Name": "Griffith Kwabena YEBOAH" },
  { "Reference Number": "21103742", "Name": "Cecil Asante OWUSU" },
  { "Reference Number": "21103977", "Name": "Roland Leo ENOCKS" },
  { "Reference Number": "21104020", "Name": "Samuel OHEMENG-BOATENG" },
  { "Reference Number": "21104292", "Name": "Palmaak Ngmenmaaloo CAMPION" },
  { "Reference Number": "21104691", "Name": "Alfred Kwaku ANINKORAH-ADDO" },
  { "Reference Number": "21104730", "Name": "Godfrey Kobina ANDAH" },
  { "Reference Number": "21104825", "Name": "Osgood Blessing BOADI ANNIN" },
  { "Reference Number": "21104828", "Name": "Shaikh Ahmed Tijani ABBAS" },
  { "Reference Number": "21104880", "Name": "Abdul Samed MUBARAK" },
  { "Reference Number": "21104907", "Name": "Elvis Nketiah OWUSU MENSAH" },
  { "Reference Number": "21105367", "Name": "Kwame Asamoah Nhyiraba AMO-ADDAE" },
  { "Reference Number": "21105419", "Name": "Nana Kwadwo SARPONG" },
  { "Reference Number": "21105504", "Name": "Benjamin Paa Kwesi GODWYLL" },
  { "Reference Number": "21105507", "Name": "Daniel Kwaku Mensah SIE" },
  { "Reference Number": "21105542", "Name": "Marvin Nyamekye ANTWI" },
  { "Reference Number": "21105831", "Name": "Elijah ADESINA" },
  { "Reference Number": "21106011", "Name": "David Yoofi AKORMEDI" },
  { "Reference Number": "21106028", "Name": "Samuel Selorm DANYO" },
  { "Reference Number": "21106066", "Name": "Michael Frimpong TUFFOUR" },
  { "Reference Number": "21106148", "Name": "Godwin Akalga AMOAH" },
  { "Reference Number": "21106151", "Name": "Andrews Amoaye OWUSU" },
  { "Reference Number": "21106324", "Name": "Felix Yiadom KONADU" },
  { "Reference Number": "21106572", "Name": "Yaw Frimpong OWUSU" },
  { "Reference Number": "21106577", "Name": "Daniel Asante ADJEI" },
  { "Reference Number": "21106599", "Name": "Samuel FRIMPONG" },
  { "Reference Number": "21106615", "Name": "Ransford Nana Addo DARKO" },
  { "Reference Number": "21106643", "Name": "Divine Frank Junior OWUSU" },
  { "Reference Number": "21106892", "Name": "Sylvester Kwabena DAPAAH" },
  { "Reference Number": "21107052", "Name": "Henry Mensah ACQUAH" },
  { "Reference Number": "21107488", "Name": "Eyram Mawulolo KLINOGO" },
  { "Reference Number": "21107607", "Name": "Meshach Nii Otoe AMOO" },
  { "Reference Number": "21107764", "Name": "Cyril Stevenson AKUMATEY" },
  { "Reference Number": "21107973", "Name": "Dennis Opoku OTENG" },
  { "Reference Number": "21108086", "Name": "Bright Yaw Kwarteng AKUOKO" },
  { "Reference Number": "21108404", "Name": "Richard OPPONG" },
  { "Reference Number": "21108421", "Name": "Mohammed Jewad Wunpini ABDUL-SAMED" },
  { "Reference Number": "21108422", "Name": "Halal Ramadan Chelpang ABDUL-SAMED" },
  { "Reference Number": "21108446", "Name": "Mustapha IBRAHIM" },
  { "Reference Number": "21108476", "Name": "Ishmael ADAM AHMED" },
  { "Reference Number": "21108483", "Name": "Emmanuel Elikem DZONTOH" },
  { "Reference Number": "21108538", "Name": "Joseph PATTERSON" },
  { "Reference Number": "21108576", "Name": "Samuel Kwaku ABANKWA" },
  { "Reference Number": "21108632", "Name": "Joshua ABAKAH" },
  { "Reference Number": "21108857", "Name": "Munkaila Suhuyini ADAM" },
  { "Reference Number": "21109115", "Name": "Richmond Kwame GYASI" },
  { "Reference Number": "21109591", "Name": "Caleb Appiah AKOSAH" },
  { "Reference Number": "21109648", "Name": "Louis FRIMPONG" },
  { "Reference Number": "21109675", "Name": "Egil Bishop Emmanuel NZULU" },
  { "Reference Number": "21109684", "Name": "Emmanuel KONADU" },
  { "Reference Number": "21109700", "Name": "Henry Kyei ANTWI" },
  { "Reference Number": "21109706", "Name": "Donatus Seyram Yao KUDJAWU" },
  { "Reference Number": "21109818", "Name": "Eugene Junior GYABAAH" },
  { "Reference Number": "21109889", "Name": "Nana Osei Kwabena KYEI BAFFOUR" },
  { "Reference Number": "21109959", "Name": "Kwaku Boadi Ayim BOAKYE" },
  { "Reference Number": "21110055", "Name": "Amin Harun HISHAM" },
  { "Reference Number": "21110253", "Name": "Derrick APPIAH-AGYEI" },
  { "Reference Number": "21110476", "Name": "Nana Yaw Takyi OPOKU" },
  { "Reference Number": "21110972", "Name": "Henry Owusu OSEI" },
  { "Reference Number": "21111006", "Name": "Erastus Psalm-Newton AMARTEY" },
  { "Reference Number": "21111066", "Name": "Nathan ANSAH" },
  { "Reference Number": "21111277", "Name": "Daniel ANKOMAH" },
  { "Reference Number": "21111368", "Name": "Sylvester ABBAN-OTOO" },
  { "Reference Number": "21111407", "Name": "Kingsford Yeboah AKRASI" },
  { "Reference Number": "21111606", "Name": "Ibrahim Junior BOAKYE" },
  { "Reference Number": "21111674", "Name": "Agyarko Manu DUAH" },
  { "Reference Number": "21111964", "Name": "Bernard Yaw KWARTENG" },
  { "Reference Number": "21112319", "Name": "Prince ASIEDU-ADDO" },
  { "Reference Number": "21112486", "Name": "Watson Emmanuel Elorm AGBEKO" },
  { "Reference Number": "21112518", "Name": "Emmanuel Adu APPIAH" },
  { "Reference Number": "21112753", "Name": "James Kwadwo DONKOR" },
  { "Reference Number": "21112833", "Name": "Nana Asare AMOANI NTOW" },
  { "Reference Number": "21113727", "Name": "Suhyini Mansur ALIDU YAKUBU" },
  { "Reference Number": "21113885", "Name": "Teddy Ohene AMAKYE" },
  { "Reference Number": "21113891", "Name": "Gerald Kimathi ZIMMERMANN" },
  { "Reference Number": "21114097", "Name": "Christopher Opoku SAKA" },
  { "Reference Number": "21114131", "Name": "Gyarteng OTCHERE-APPIAH" },
  { "Reference Number": "21114154", "Name": "Isaac Sarkodie Kwaku BOAHIN" },
  { "Reference Number": "21114313", "Name": "Richard Darko SINTIM" },
  { "Reference Number": "21114429", "Name": "Aaron Offei DARKO" },
  { "Reference Number": "21114750", "Name": "Charles OWUSU" },
  { "Reference Number": "21114952", "Name": "Acquah Kwabena DWOMOH" },
  { "Reference Number": "21115036", "Name": "John OPPONG" },
  { "Reference Number": "21115071", "Name": "Kwabena Adu ODAME-LARBI" },
  { "Reference Number": "21115248", "Name": "Harry Barimah OPOKU-AGYEMANG" },
  { "Reference Number": "21115426", "Name": "Nathaniel Ofori ACHEAMPONG" },
  { "Reference Number": "21115559", "Name": "Abraham Kweku AFEDO" },
  { "Reference Number": "21115649", "Name": "Kwaasi AMANOR" },
  { "Reference Number": "21115770", "Name": "Righteous Kwadwo APPIAH" },
  { "Reference Number": "21115781", "Name": "Patrick LOMOTEY" },
  { "Reference Number": "21115847", "Name": "Augustine Nana Kwame FRIMPONG" },
  { "Reference Number": "21115933", "Name": "Nathaniel Nana Yaw Kyereboah AMOO" },
  { "Reference Number": "21116020", "Name": "Kwabena Antwi OTU-DANQUAH" },
  { "Reference Number": "21116093", "Name": "Michael OSEI-OWUSU" },
  { "Reference Number": "21116186", "Name": "Kofi Donald AMPONSAH GYAMFI" },
  { "Reference Number": "21116356", "Name": "Daniel OFORI" },
  { "Reference Number": "21116389", "Name": "Emmanuel Oti BOAKYE" },
  { "Reference Number": "21116522", "Name": "Simeon Kwaku OSEI" },
  { "Reference Number": "21116537", "Name": "Pascal NKORNYUI" },
  { "Reference Number": "21116559", "Name": "Bryan NKANSAH APPAU" },
  { "Reference Number": "21116594", "Name": "Felix Elikplim DAKE" },
  { "Reference Number": "21116877", "Name": "Jonathan Nbuti TALA" },
  { "Reference Number": "21116882", "Name": "Martin Dave GYIMAH" },
  { "Reference Number": "21117131", "Name": "Erastus Uriah Nyarku KWAW" },
  { "Reference Number": "21117150", "Name": "Dag Heward Mills AMOAH" },
  { "Reference Number": "21117298", "Name": "Kobby Barima Sagu OSEI" },
  { "Reference Number": "21117464", "Name": "Bright Emmanuel DARKWA" },
  { "Reference Number": "21117484", "Name": "Tarik Angaamwine AHMED" },
  { "Reference Number": "21117836", "Name": "Ebenezer Divine ASARE-MENSAH" },
  { "Reference Number": "21117885", "Name": "Daniel Agyapong BOATENG" },
  { "Reference Number": "21117921", "Name": "Jehoiada Kekeli EKLU-REI" },
  { "Reference Number": "21117930", "Name": "Felix Yamoah BONSU" },
  { "Reference Number": "21118091", "Name": "Nana Owusu BOADI-BOSOMPEM" },
  { "Reference Number": "21118097", "Name": "Leji Cudjoe DARKE" },
  { "Reference Number": "21118258", "Name": "Joseph Papa Kow Akyere GHARTEY" },
  { "Reference Number": "21118306", "Name": "Ivan Nii Adu COFIE" },
  { "Reference Number": "21118487", "Name": "Nana Ofori Agyemang MARFO" },
  { "Reference Number": "21118778", "Name": "Dominic Mponpiin NGBICHE" },
  { "Reference Number": "21119103", "Name": "Enoch Gyasi APPIAH" },
  { "Reference Number": "21119153", "Name": "Ezekiel OSEI BOAKYE" },
  { "Reference Number": "21119216", "Name": "Francis Ampofo KWARTENG" },
  { "Reference Number": "21119446", "Name": "Jarvis Kwaku Agyemang DUAH" },
  { "Reference Number": "21119582", "Name": "Lesley Duah OTENG" },
  { "Reference Number": "21119602", "Name": "Cyrus EYISON" },
  { "Reference Number": "21119796", "Name": "James OPOKU" },
  { "Reference Number": "21119811", "Name": "Samuel Asamoah AWUAH" },
  { "Reference Number": "21119983", "Name": "Alfred ANTWI" },
  { "Reference Number": "21120019", "Name": "Ebenezer AKAKPO" },
  { "Reference Number": "21120134", "Name": "Felix Caleb DONKOH" },
  { "Reference Number": "21120167", "Name": "Jessy SARPONG" },
  { "Reference Number": "21120288", "Name": "Abdul Hakim ISSAH" },
  { "Reference Number": "21120398", "Name": "Alex Atuahene ODURO" },
  { "Reference Number": "21120642", "Name": "Heinze Brew Addo ASARE" },
  { "Reference Number": "21120702", "Name": "Lord Mensah KORANTENG" },
  { "Reference Number": "21120783", "Name": "Hakim Stanley MOHAMMED" },
  { "Reference Number": "21120832", "Name": "Kwesi Buabeng BORTEI" },
  { "Reference Number": "21120850", "Name": "Kelvin Boateng FRIMPONG" },
  { "Reference Number": "21120866", "Name": "Donald Kwaku Junior BOAMAH" },
  { "Reference Number": "21121386", "Name": "Joshua Kojo ACKON" },
  { "Reference Number": "21121395", "Name": "Tawfiq Awushi MUMUNI" },
  { "Reference Number": "21121397", "Name": "Emmanuel Nartey KWASHIE" },
  { "Reference Number": "21121424", "Name": "Bright Nimoh BOAKYE" },
  { "Reference Number": "21121602", "Name": "Caleb Kwaku AHETO" },
  { "Reference Number": "21121683", "Name": "Anthony Tawiah YEBOAH" },
  { "Reference Number": "21122116", "Name": "Samuel Mawunya SAGOE" },
  { "Reference Number": "21122270", "Name": "Esbern Wemako AYIKADE" },
  { "Reference Number": "21122401", "Name": "Taufic ALHASSAN" },
  { "Reference Number": "21122446", "Name": "Judah Kwadwo OSITA" },
  { "Reference Number": "21122597", "Name": "Alhassan Mohammed Bello ABDALLA" },
  { "Reference Number": "21122623", "Name": "Nathaniel Aniweh Kumuriye KANTORGORJE" },
  { "Reference Number": "21122639", "Name": "Christian Kojo Danso MOTTEY" },
  { "Reference Number": "21122765", "Name": "Karl DJANSI" },
  { "Reference Number": "21122792", "Name": "Padmore Atweri ABOAH" },
  { "Reference Number": "21123041", "Name": "Jesse Abbey LAUD-ABBEY" },
  { "Reference Number": "21123223", "Name": "Prosper Emmanuel NYARKO" },
  { "Reference Number": "21123309", "Name": "Francis AINOO" },
  { "Reference Number": "21123744", "Name": "Emmanuel Eli ASHIAGBOR" },
  { "Reference Number": "21123777", "Name": "Ebenezer Ansah GYABAAH" },
  { "Reference Number": "21123976", "Name": "Prince AMANFO" },
  { "Reference Number": "21123989", "Name": "Emmanuel Kweku AMPONSAH" },
  { "Reference Number": "21124018", "Name": "Rex-Mike Appiah HAYFORD" },
  { "Reference Number": "21124198", "Name": "Gaddarfi MOHAMMED" },
  { "Reference Number": "21124321", "Name": "Gabriel Marfo FOSU" },
  { "Reference Number": "21124398", "Name": "Allen Kojo Mawuli HODOAMEDA" },
  { "Reference Number": "21124838", "Name": "Adiel TWENEBOAH-KODUAH" },
  { "Reference Number": "21124883", "Name": "Michael AFRIYIE" },
  { "Reference Number": "21125022", "Name": "Jeffrey Papa Koodu EPHRAIM" },
  { "Reference Number": "21125141", "Name": "Rexford Adomako APEA" },
  { "Reference Number": "21125476", "Name": "Newton Nsiah ARTHUR" },
  { "Reference Number": "21125655", "Name": "Daniel Nimakoh ASARE" },
  { "Reference Number": "21125784", "Name": "Kwaku Gyimah BEMPONG" },
  { "Reference Number": "21125959", "Name": "Michael Asante OPOKU" },
  { "Reference Number": "21126425", "Name": "Gerald BIRCH-MENSAH" },
  { "Reference Number": "21126811", "Name": "Ciici CRENTSIL" },
  { "Reference Number": "21126870", "Name": "Simon Prince QUARM" },
  { "Reference Number": "21126901", "Name": "Justlord Kwame AGYEI" },
  { "Reference Number": "21127050", "Name": "Pius Yaw FRIMPONG" },
  { "Reference Number": "21127337", "Name": "Kelvin Ampaw DARKO" },
  { "Reference Number": "21127380", "Name": "Darlington Kwaku Duah ABUBEKR" },
  { "Reference Number": "21128210", "Name": "Kelly Kwesi OKOTO" },
  { "Reference Number": "21128234", "Name": "Adolf OSEI" },
  { "Reference Number": "21128414", "Name": "Benedict Kwame KARIKARI" },
  { "Reference Number": "21128567", "Name": "Egidio Addae AMANKWAH" },
  { "Reference Number": "21129509", "Name": "Naziel AHMED" },
  { "Reference Number": "21129653", "Name": "Nana Kwaku Boateng OPOKU-BOATENG" },
  { "Reference Number": "21130060", "Name": "Success OGUAMA" },
  { "Reference Number": "21130737", "Name": "Kelvin Kwadwo AYISI" },
  { "Reference Number": "21131951", "Name": "Selorm TETTEH-ABOTSI" },
  { "Reference Number": "21132408", "Name": "Eugene Kwabena ADADE" },
  { "Reference Number": "21132772", "Name": "Unayisu JAFARU" },
  { "Reference Number": "21132800", "Name": "David Kofi Manteaw ADU-DARKO" },
  { "Reference Number": "21132860", "Name": "Bevan Oppong Amoakohene TABIRI" },
  { "Reference Number": "21133015", "Name": "Forson Benedictus ABU-BONSRA" },
  { "Reference Number": "21133041", "Name": "Linnex Brempong NSOWAH" },
  { "Reference Number": "21133144", "Name": "Gerald OWUSU-ANSAH" },
  { "Reference Number": "21133158", "Name": "Kofi Asante AGYEMANG" },
  { "Reference Number": "21133250", "Name": "Giovanni KAKU-ACKAH" },
  { "Reference Number": "21133301", "Name": "Stephen Obeng EHURENG" },
  { "Reference Number": "21133425", "Name": "Kofi CUDJOE" },
  { "Reference Number": "21133436", "Name": "Samuel Kwesi Kumi ASARE" },
  { "Reference Number": "21133690", "Name": "Jedidiah Owusu-Ansah MANU" },
  { "Reference Number": "21133789", "Name": "Godwyll Korley MENSAH" },
  { "Reference Number": "21133901", "Name": "Randy KWARTENG" },
  { "Reference Number": "21133918", "Name": "John Kyei OKYERE" },
  { "Reference Number": "21133969", "Name": "Samuel Edem ABRAHAM" },
  { "Reference Number": "21134053", "Name": "Bryson Paul OWUSU" },
  { "Reference Number": "21134307", "Name": "Afrane OWUSU" },
  { "Reference Number": "21134634", "Name": "Hakim IBRAHIM" },
  { "Reference Number": "21134909", "Name": "Isaac Saki ADUSU" },
  { "Reference Number": "21135276", "Name": "Seth Narh TSUASAM" },
  { "Reference Number": "21135342", "Name": "Emmanuel ODURO" },
  { "Reference Number": "21135413", "Name": "Festus Kwesi KUMADO" },
  { "Reference Number": "21135783", "Name": "Alfred ADOMAKO" },
  { "Reference Number": "21135935", "Name": "Johnson Kwabena DEBRAH" },
  { "Reference Number": "21136038", "Name": "Herman Nayram LUMOR" },
  { "Reference Number": "21136091", "Name": "Odeneho Kwaku AFFRAM-MENSAH" },
  { "Reference Number": "21136101", "Name": "Reginald Nana OFOSUH-AGYEMANG" },
  { "Reference Number": "21136560", "Name": "Abdul Kudus Wunpini ABUBAKARI" },
  { "Reference Number": "21136564", "Name": "Kwabena Owusu AMANKWAH" },
  { "Reference Number": "21136889", "Name": "Melchizedek Bright Kafui ATTUBRAH" },
  { "Reference Number": "21136945", "Name": "Lawrence Shie DAPAAH" },
  { "Reference Number": "21136996", "Name": "Latif Habib Kassim ABDUL" },
  { "Reference Number": "21137181", "Name": "Jeffter Boakye ANTWI" },
  { "Reference Number": "21137568", "Name": "Oteng Nana GYIMAH" },
  { "Reference Number": "21137589", "Name": "Jason David Opoku AMOAH" },
  { "Reference Number": "21137609", "Name": "Emmanuel Kyei FRIMPONG" },
  { "Reference Number": "21137661", "Name": "Dennis Adu BROWN" },
  { "Reference Number": "21137671", "Name": "Kojo Atta BANSON" },
  { "Reference Number": "21137689", "Name": "Desmond ADJEI" },
  { "Reference Number": "21138043", "Name": "Christopher Lartey MENSAH" },
  { "Reference Number": "21138201", "Name": "Abubakar Sadiq MUNTARI" },
  { "Reference Number": "21138217", "Name": "Gideon Kekeli DOGBEY" },
  { "Reference Number": "21138594", "Name": "Adusei Yaw Amanfo BOATENG" },
  { "Reference Number": "21138722", "Name": "Lawrence Mawuli AYIM" },
  { "Reference Number": "21138853", "Name": "Jaafar Tahama SAFIANU" },
  { "Reference Number": "21138884", "Name": "Astrea Oteng APPIAH" },
  { "Reference Number": "21138976", "Name": "Kelvin OFORI ASARE" },
  { "Reference Number": "21138984", "Name": "John Paul OSEI-AMEYAW" },
  { "Reference Number": "21139487", "Name": "King Ofosu HAGAN" },
  { "Reference Number": "21139582", "Name": "Adnan KASSIM" },
  { "Reference Number": "21139592", "Name": "Kweku Amoako ASIEDU-ADDO" },
  { "Reference Number": "21139802", "Name": "Enoch Sitsofe NKRUMAH" },
  { "Reference Number": "21140103", "Name": "Owusu Jeffery BENIANA" },
  { "Reference Number": "21140182", "Name": "Jotham Kemuel Adoleyine MAHAMA" },
  { "Reference Number": "21140219", "Name": "Eugene Asamoah ANTWI-BOASIAKO" },
  { "Reference Number": "21140389", "Name": "Prince Charles ACHEN ARMAH" },
  { "Reference Number": "21140495", "Name": "Perry NYARKOH" },
  { "Reference Number": "21140663", "Name": "Wisdom MBIR" },
  { "Reference Number": "21140921", "Name": "Isaac Korankye PEPRAH" },
  { "Reference Number": "21141126", "Name": "Blessed OPPONG" },
  { "Reference Number": "21141170", "Name": "Kelvin Nkensen OBIRIGYA" },
  { "Reference Number": "21141264", "Name": "Kingsley Sedem Komla AMPOTI" },
  { "Reference Number": "21141375", "Name": "Kwabena Boahene BREFO" },
  { "Reference Number": "21141397", "Name": "Michael Nkam BAWOLE-NYIGMAH" },
  { "Reference Number": "21141454", "Name": "Philemon Osei KUSI" },
  { "Reference Number": "21141598", "Name": "Kelvin Kwaku OWUSU" },
  { "Reference Number": "21141644", "Name": "Nana Kweku Korankye JONES" },
  { "Reference Number": "21141716", "Name": "Robert AMOAH" },
  { "Reference Number": "21141825", "Name": "Jeffery Osei-Mensah AMPAABENG" },
  { "Reference Number": "21142025", "Name": "Michael Baffour AWUAH" },
  { "Reference Number": "21142111", "Name": "Ignatius Bernard ANSAH" },
  { "Reference Number": "21142245", "Name": "Kwame Danso AMPONSEM" },
  { "Reference Number": "21142543", "Name": "Gideon TIBUAH" },
  { "Reference Number": "21142789", "Name": "Papa Kobina Asmah OKOTA" },
  { "Reference Number": "21142799", "Name": "Daniel Nti ACHEAMPONG" },
  { "Reference Number": "21142819", "Name": "Albert OSEI" },
  { "Reference Number": "21142823", "Name": "Emmanuel NARH" },
  { "Reference Number": "21143082", "Name": "Nana Kwadwo ADU ADJEI" },
  { "Reference Number": "21143165", "Name": "Ransford ADI" },
  { "Reference Number": "21143221", "Name": "Nana Opoku Nti PEPRAH" },
  { "Reference Number": "21143351", "Name": "Gabriel Gbiel Junior BENARKUU" },
  { "Reference Number": "21143477", "Name": "Godwin Baba AKUDUGU" },
  { "Reference Number": "21143635", "Name": "Richard Winfred Anane MENSAH ABRAMPAH" },
  { "Reference Number": "21143734", "Name": "Michael Nhyira Fiifi DARKO" },
  { "Reference Number": "21143743", "Name": "Kwaku Junior OHENE-DJAN" },
  { "Reference Number": "21144015", "Name": "Jesse Caleb Abeiku Dziedzorm SEANEYE" },
  { "Reference Number": "21144022", "Name": "Randy Fortunate AFFUL" },
  { "Reference Number": "21144315", "Name": "Bryant Sowatey ADJEI-SOWATEY" },
  { "Reference Number": "21144326", "Name": "Prince AIDOO" },
  { "Reference Number": "21144459", "Name": "Nana Baffoe ETREW-ARHIN" },
  { "Reference Number": "21144466", "Name": "Derrick MENSAH" },
  { "Reference Number": "21144796", "Name": "Harry Ephraim NARTEY" },
  { "Reference Number": "21144861", "Name": "Yaw Afrifa Asante AMOAH" },
  { "Reference Number": "21145292", "Name": "Prudence Uwolowuaboe AGBESI" },
  { "Reference Number": "21145355", "Name": "Manasseh Asiwomeh AZUMAH" },
  { "Reference Number": "21145549", "Name": "Benjamin Opoku ASANTE" },
  { "Reference Number": "21145773", "Name": "Paul Oghenevwede OTADAFERUA" },
  { "Reference Number": "21145799", "Name": "Reginald Kofi OWIREDU-YEBOAH" },
  { "Reference Number": "21145954", "Name": "Isaac Kusi ASUBONTENG" },
  { "Reference Number": "21145962", "Name": "Dean Opoku TETE SAKYI" },
  { "Reference Number": "21146362", "Name": "Kwaku Hayford AGYARE" },
  { "Reference Number": "21146527", "Name": "Orleans Kojo BARNES" },
  { "Reference Number": "21146981", "Name": "Emmanuel Agyemang PREMPEH" },
  { "Reference Number": "21147225", "Name": "Kwaku Darko AKUFFO-DAKWA" },
  { "Reference Number": "21147268", "Name": "Emmanuel Adjei QUARSHIE" },
  { "Reference Number": "21147590", "Name": "Nana Boakye AGYEMAN" },
  { "Reference Number": "21147669", "Name": "Zakari Adams ABUBAKAR" },
  { "Reference Number": "21147679", "Name": "Bright Opoku OSEI" },
  { "Reference Number": "21147690", "Name": "Ekow Obour Mensah ASSABIL" },
  { "Reference Number": "21147769", "Name": "Nana Ofori Agyemang BARNES" },
  { "Reference Number": "21147808", "Name": "Philip TESIMBO" },
  { "Reference Number": "21147933", "Name": "Emmanuel AMISSAH" },
  { "Reference Number": "21147962", "Name": "Nathaniel Korley ADOR" },
  { "Reference Number": "21147966", "Name": "Frank Adu AGYARE" },
  { "Reference Number": "21148051", "Name": "Ebenezer Tetteh PARTEY" },
  { "Reference Number": "21148405", "Name": "Kwabena OWUSU-OFORI" },
  { "Reference Number": "21148551", "Name": "Eric HAMMOND" },
  { "Reference Number": "21148790", "Name": "Clifford Kwabena AKOSAH" },
  { "Reference Number": "21148803", "Name": "Wilfred Okai OBENG" },
  { "Reference Number": "21148835", "Name": "Nigel Kwarteng DARKWA" },
  { "Reference Number": "21149217", "Name": "Kwasi Gyamfi FORDJOUR" },
  { "Reference Number": "21149282", "Name": "Louis Mawulolo DALIESOR" },
  { "Reference Number": "21149444", "Name": "Samuel Boadi AMPOMAH" },
  { "Reference Number": "21149544", "Name": "Prince Degbe AMOAH" },
  { "Reference Number": "21149554", "Name": "Mawuenam Kofi ANYAWOE" },
  { "Reference Number": "21149946", "Name": "Kenneth Nana Kwame LARBI" },
  { "Reference Number": "21150756", "Name": "Calvin Opare AGLUBI" },
  { "Reference Number": "21150908", "Name": "Kelvin Arhinful ADJEI" },
  { "Reference Number": "21151038", "Name": "Kwabena Afriyie ABRAH" },
  { "Reference Number": "21151065", "Name": "Isaac Kwaku ADDAI" },
  { "Reference Number": "21151099", "Name": "Reginald Selasi ALIFUI" },
  { "Reference Number": "21151179", "Name": "Rooney Afriyie NSIAH" },
  { "Reference Number": "21151288", "Name": "Dave Yirenkyi ASIAMAH" },
  { "Reference Number": "21151292", "Name": "Caleb Dwamena ANTWI" },
  { "Reference Number": "21151400", "Name": "Daniel Boateng OSAFO" },
  { "Reference Number": "21151531", "Name": "Nicholas Kwadwo ANSU" },
  { "Reference Number": "21152011", "Name": "Lukeman Agambilla ABUBAKAR" },
  { "Reference Number": "21152016", "Name": "Darrel Nana Kwabena AMOAH-DUAH" },
  { "Reference Number": "21152140", "Name": "Prince Sarfo SAMPAH" },
  { "Reference Number": "21152271", "Name": "Yorke Emmanuel NTOW" },
  { "Reference Number": "21152292", "Name": "Emmanuel AMPENE" },
  { "Reference Number": "21152366", "Name": "Kelvin Owusu BEDIAKO" },
  { "Reference Number": "21152571", "Name": "Justin Opoku ANTWI" },
  { "Reference Number": "21152736", "Name": "Elijah Ayinbota AYINOMBA" },
  { "Reference Number": "21153429", "Name": "Kelvin Kwabena PARKINGSTON" },
  { "Reference Number": "21153931", "Name": "Samuel AIDOO" },
  { "Reference Number": "21154734", "Name": "Frederick Okai Mensah EKUMAN" },
  { "Reference Number": "21154940", "Name": "Obed OPOKU JUNIOR" },
  { "Reference Number": "21155144", "Name": "Henry Junior OSEI ADU" },
  { "Reference Number": "21155152", "Name": "Godfred Nyame BOATENG" },
  { "Reference Number": "21155294", "Name": "Caleb Delasi ABBLODE" },
  { "Reference Number": "21155444", "Name": "Jacob OKYERE ABOAGYE" },
  { "Reference Number": "21159033", "Name": "Blessing Yaw NYAMEKYE" },
  { "Reference Number": "21159348", "Name": "Oswald Nelson Adjetey ADJEI" },
  { "Reference Number": "21159530", "Name": "Raubeel YUSSIF" },
  { "Reference Number": "21160699", "Name": "Abdul Basit ABUBAKAR" },
  { "Reference Number": "21160934", "Name": "Jesse Mckeown KWAMIFIO" },
  { "Reference Number": "21161054", "Name": "Isaac APPIAH-QUANSAH" },
  { "Reference Number": "21161368", "Name": "Emmanuel Sintim Aboagye GYAMFI" },
  { "Reference Number": "21161714", "Name": "Salifu ALHASSAN" },
  { "Reference Number": "21161863", "Name": "Samuel ADJEI" },
  { "Reference Number": "21162046", "Name": "Confidence DZOTI" },
  { "Reference Number": "21162068", "Name": "Gideon Owusu AMISSAH" },
  { "Reference Number": "21162255", "Name": "Samuel Nana Yaw ASIEDU" },
  { "Reference Number": "21163492", "Name": "Samuel Yaw AGYEPONG" },
  { "Reference Number": "21163755", "Name": "Joseph ABBAN" },
  { "Reference Number": "21164192", "Name": "Ahmed Yenduupaab IBRAHIM" },
  { "Reference Number": "21164732", "Name": "Emmanuel Kyeremeh TANNOR" },
  { "Reference Number": "21164959", "Name": "Isaac SAM" },
  { "Reference Number": "21165095", "Name": "Michael Baffour AWUAH" },
  { "Reference Number": "21165276", "Name": "Lemuel Nyamedom BENYARKU" },
  { "Reference Number": "21165639", "Name": "Abdul - Haqq Bonsabo AMADU" },
  { "Reference Number": "21165766", "Name": "Stephen Tetteh AGBONGUA" },
  { "Reference Number": "21166316", "Name": "Jeremy Sefa BROBBEY" },
  { "Reference Number": "21166886", "Name": "Ali ABUBAKAR" },
  { "Reference Number": "21166887", "Name": "Prince Owusu ARHIN" },
  { "Reference Number": "21167024", "Name": "Richmond Yaw Mawuko AMANU" },
  { "Reference Number": "21167136", "Name": "Rooney Wayne ASSUAH" },
  { "Reference Number": "21167246", "Name": "Maxwell Kwame Sarpong ASIEDU" },
  { "Reference Number": "21167281", "Name": "Davis Cadwell ADJEI" },
  { "Reference Number": "21167508", "Name": "Ohene Yaw MIREKU" },
  { "Reference Number": "21167763", "Name": "Isaac Sitso BRENTUO" },
  { "Reference Number": "21168348", "Name": "Kwasi Boakye SENCHEREY" },
  { "Reference Number": "21169189", "Name": "Nana Obenefour ODURO KWAKWA" },
  { "Reference Number": "21169814", "Name": "Nathaniel Essah ADU" },
  { "Reference Number": "21170238", "Name": "Talha Yushaw DODO" },
  { "Reference Number": "21170656", "Name": "Romeo Ntow MORCHER" },
  { "Reference Number": "21171066", "Name": "Tervin FORKUO" },
  { "Reference Number": "21171425", "Name": "Alhassan Labbo ISSAHAKU" },
  { "Reference Number": "21172055", "Name": "Gerald Tawiah OFORI" },
  { "Reference Number": "21172410", "Name": "Ramsey Selasi AGBENORKU" },
  { "Reference Number": "21172708", "Name": "Gideon ASUMANG" },
  { "Reference Number": "21173104", "Name": "Christian ADU" },
  { "Reference Number": "21173699", "Name": "Louis Agyemang ANKAMAH" },
  { "Reference Number": "21173879", "Name": "Lincoln Deladem ZOWONU" },
  { "Reference Number": "21174488", "Name": "Emmanuel DRAMANI" },
  { "Reference Number": "21174840", "Name": "Godsway Kofi OSEI" },
  { "Reference Number": "21174977", "Name": "Chris Kingsford ESHUN" },
  { "Reference Number": "21182799", "Name": "Marcariuf Aweniami AKANWARIWIAK" },
  { "Reference Number": "21182893", "Name": "Tei ODARTEY-FIO" },
  { "Reference Number": "21183213", "Name": "Michael Dwamena ANTWI" },
  { "Reference Number": "21183269", "Name": "David Afriyie FOBI" },
  { "Reference Number": "21183885", "Name": "Gideon ANAMAN" },
  { "Reference Number": "21184171", "Name": "Kelvin ADU-YEBOAH" },
  { "Reference Number": "21184378", "Name": "Morris Adu-Baah EDUAH" },
  { "Reference Number": "21184589", "Name": "Christ-Demenu ARIZI" },
  { "Reference Number": "21184738", "Name": "Theophilus Asaah AGANA" },
  { "Reference Number": "21185007", "Name": "Frimpong Edmund ANSONG" },
  { "Reference Number": "21185551", "Name": "Kelvin ADUSEI" },
  { "Reference Number": "21185562", "Name": "James Kofi Dadzie ACQUAH" },
  { "Reference Number": "21185981", "Name": "Rooney Adu Gyamfi KYEI" },
  { "Reference Number": "21185993", "Name": "Alex Osei ADJEI-ASAMOAH" },
  { "Reference Number": "21186710", "Name": "Jens-Marckwald Kofi ADARKWA" },
  { "Reference Number": "21187339", "Name": "Maxwell BENTUM" },
  { "Reference Number": "21187763", "Name": "Abdul Muhaimin IBRAHIM" },
  { "Reference Number": "21475407", "Name": "Pa Alieu NJIE" },
  { "Reference Number": "21476250", "Name": "Wonder Ephraim Mbakadi MBUALA" },
  { "Reference Number": "21476841", "Name": "Julien Glory MANANA" },
  { "Reference Number": "22584670", "Name": "Obada Tammam DAYOUB" },
  { "Reference Number": "20276397", "Name": "Eugene Asiate-Wen ADANGABEY" },
  { "Reference Number": "20822656", "Name": "Lloyd AIKINS" },
];

// Admin WhatsApp number (with country code, no +)
const ADMIN_WHATSAPP = "233500000000"; // Replace with your actual WhatsApp number

function App() {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [userData, setUserData] = useState(null);
  const [alreadyUsed, setAlreadyUsed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Load used indices from localStorage
  const [usedIndices, setUsedIndices] = useState(() => {
    const saved = localStorage.getItem('cs2028_used_indices');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cs2028_used_indices', JSON.stringify(usedIndices));
  }, [usedIndices]);

  const handleInputChange = (e) => {
    setReferenceNumber(e.target.value.toUpperCase());
    setErrorMessage('');
    setAlreadyUsed(false);
  };

  const validateReference = () => {
    // Check if already used
    if (usedIndices.includes(referenceNumber.trim())) {
      const student = EXCEL_DATA.find(row => 
        String(row['Reference Number']).trim().toUpperCase() === String(referenceNumber).trim().toUpperCase()
      );
      return { 
        valid: false, 
        alreadyUsed: true,
        name: student ? student['Name'] : 'Student'
      };
    }

    const found = EXCEL_DATA.find(row => {
      const refValue = row['Reference Number'] || row['Reference'] || row['reference'] || row['ReferenceNumber'];
      return String(refValue).trim().toUpperCase() === String(referenceNumber).trim().toUpperCase();
    });

    if (found) {
      const name = found['Name'] || found['name'] || found['NAME'] || 'Student';
      
      return {
        valid: true,
        name: name
      };
    }

    return { valid: false, message: 'Information not found!' };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    setTimeout(() => {
      const result = validateReference();
      
      if (result.valid) {
        setUserData({
          name: result.name
        });
        setUsedIndices(prev => [...prev, referenceNumber.trim().toUpperCase()]);
        setStatus('success');
        setShowSuccessModal(true);
      } else if (result.alreadyUsed) {
        setAlreadyUsed(true);
        setUserData({
          name: result.name
        });
        setStatus('alreadyUsed');
        setShowSuccessModal(true);
      } else {
        setStatus('error');
        setErrorMessage(result.message);
      }
    }, 1500);
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setReferenceNumber('');
    setUserData(null);
    setAlreadyUsed(false);
    setStatus('idle');
  };

  const getWhatsAppLink = (name) => {
    const message = `Hello please I'm here for help, my name is: ${name}`;
    return `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="app-container">
      <div className="background-effects">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <header className="header">
        <div className="logo-container">
          <div className="logo-icon">⚛</div>
          <h1>COMPUTER SCIENCE</h1>
          <h2>2028 AUTH</h2>
        </div>
        <p className="tagline">Enter your reference number to verify</p>
      </header>

      <main className="main-content">
        <div className="auth-card">
          <div className="card-header">
            <div className="header-accent"></div>
            <h3>Student Verification</h3>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="referenceNumber">
                <span className="label-icon">🔢</span>
                Reference Number
              </label>
              <input
                type="text"
                id="referenceNumber"
                name="referenceNumber"
                value={referenceNumber}
                onChange={handleInputChange}
                placeholder="Enter your reference number"
                required
                className="form-input reference-input"
              />
            </div>

            {status === 'error' && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className={`submit-btn ${status === 'loading' ? 'loading' : ''}`}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <span className="loading-content">
                  <span className="spinner"></span>
                  Verifying...
                </span>
              ) : (
                <>
                  <span className="btn-icon">🔓</span>
                  Verify
                </>
              )}
            </button>
          </form>
        </div>
      </main>

      {showSuccessModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content success-modal" onClick={e => e.stopPropagation()}>
            {alreadyUsed ? (
              <>
                <div className="error-icon-large">⚠️</div>
                <h2>Already Verified!</h2>
                
                <div className="user-info-display">
                  <p className="welcome-text">Welcome back,</p>
                  <p className="user-name">{userData?.name}</p>
                </div>
                
                <div className="whatsapp-section">
                  <p>You've already verified. Need help?</p>
                  <a 
                    href={getWhatsAppLink(userData?.name)}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="whatsapp-btn reach-out-btn"
                  >
                    <span>💬</span>
                    Reach Out
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="success-icon">🎉</div>
                <h2>Verification Successful!</h2>
                
                <div className="user-info-display">
                  <p className="welcome-text">Welcome,</p>
                  <p className="user-name">{userData?.name}</p>
                </div>
                
                <div className="whatsapp-section">
                  <p>Click below to join your WhatsApp group:</p>
                  <a 
                    href="https://chat.whatsapp.com/H2YSqPFEjYK0MxxxNqLUJo"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="whatsapp-btn"
                    onClick={closeModal}
                  >
                    <span>💬</span>
                    Join WhatsApp Group
                  </a>
                </div>
              </>
            )}

            <button className="close-modal-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>© 2026 Computer Science 2028 • All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
