import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ptywpubhtqkewyzzmhlj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0eXdwdWJodHFrZXd5enptaGxqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjQ2OTYxNywiZXhwIjoyMDkyMDQ1NjE3fQ.HxfWEFeHIFVKC8M6bkIrGJTgKX_YksO6ObpemQ9C5nA'
);

// ── CATEGORIES ───────────────────────────────────────────────────────────────
const categories = [
  { slug: 'gaming-controllers', name: 'Gaming Controllers', icon_emoji: '🎮', sort_order: 1 },
  { slug: 'phones',             name: 'Phones',             icon_emoji: '📱', sort_order: 2 },
  { slug: 'tv-remotes',         name: 'TV Remotes',         icon_emoji: '📺', sort_order: 3 },
  { slug: 'electronics',        name: 'Electronics',        icon_emoji: '💻', sort_order: 4 },
  { slug: 'cars',               name: 'Cars',               icon_emoji: '🚗', sort_order: 5 },
];

// ── DEVICES ──────────────────────────────────────────────────────────────────
const devices = [
  // Gaming controllers
  { slug:'ps5-dualsense', name:'PS5 DualSense Controller', brand:'Sony', model_year:2020, description:'Sony PS5 haptic feedback controller with adaptive triggers.', common_issues:['Stick drift','Adaptive trigger not working','USB-C charging port loose','Touchpad not responding','Speaker crackling','Battery draining fast'], is_popular:true, category_slug:'gaming-controllers' },
  { slug:'ps5-dualsense-edge', name:'PS5 DualSense Edge Controller', brand:'Sony', model_year:2023, description:'Sony pro controller with swappable stick modules and rear buttons.', common_issues:['Stick module worn out','Rear button not registering','Profile not saving','USB-C port damage'], is_popular:false, category_slug:'gaming-controllers' },
  { slug:'ps4-dualshock-4', name:'PS4 DualShock 4', brand:'Sony', model_year:2013, description:'Sony PS4 controller with touchpad, Share button, and light bar.', common_issues:['Stick drift','Micro-USB port loose','L2/R2 trigger broken','Light bar not turning on','Battery not charging'], is_popular:true, category_slug:'gaming-controllers' },
  { slug:'xbox-series-x-controller', name:'Xbox Series X/S Controller', brand:'Microsoft', model_year:2020, description:'Xbox controller with textured grip, Share button, and USB-C.', common_issues:['Stick drift','Bumper button not clicking','USB-C port damage','D-pad feels mushy','Wireless disconnecting'], is_popular:true, category_slug:'gaming-controllers' },
  { slug:'xbox-one-controller', name:'Xbox One Controller', brand:'Microsoft', model_year:2013, description:'Original Xbox One controller with micro-USB and standard layout.', common_issues:['Stick drift','Micro-USB port broken','Bumper button loose','A/B/X/Y button sticky'], is_popular:false, category_slug:'gaming-controllers' },
  { slug:'xbox-360-controller', name:'Xbox 360 Controller', brand:'Microsoft', model_year:2005, description:'Classic Xbox 360 wired or wireless controller.', common_issues:['Stick drift','D-pad unresponsive','Guide button not lighting up','Trigger spring broken'], is_popular:false, category_slug:'gaming-controllers' },
  { slug:'nintendo-switch-pro-controller', name:'Nintendo Switch Pro Controller', brand:'Nintendo', model_year:2017, description:'Nintendo premium controller with gyroscope and NFC.', common_issues:['Stick drift','USB-C charging intermittent','Gyroscope drift','D-pad not registering'], is_popular:true, category_slug:'gaming-controllers' },
  { slug:'joy-con-left', name:'Joy-Con (Left)', brand:'Nintendo', model_year:2017, description:'Left Joy-Con for Nintendo Switch.', common_issues:['Stick drift','SL/SR button not working','Rail connector loose','Wrist strap connector broken'], is_popular:true, category_slug:'gaming-controllers' },
  { slug:'joy-con-right', name:'Joy-Con (Right)', brand:'Nintendo', model_year:2017, description:'Right Joy-Con with NFC, IR camera, and HD rumble.', common_issues:['Stick drift','NFC reader not working','IR camera broken','HD rumble not working'], is_popular:true, category_slug:'gaming-controllers' },
  { slug:'gamecube-controller', name:'GameCube Controller', brand:'Nintendo', model_year:2001, description:'Nintendo iconic GameCube controller, widely used for Smash Bros.', common_issues:['C-stick drift','L/R trigger spring broken','A button mushy','Cable fraying near controller'], is_popular:false, category_slug:'gaming-controllers' },
  { slug:'steam-deck', name:'Steam Deck', brand:'Valve', model_year:2022, description:'Valve portable PC gaming handheld with touchpads and gyroscope.', common_issues:['Trackpad not clicking','Joystick drift','USB-C port damage','Battery swelling','Screen flickering','Fan loud or clicking'], is_popular:true, category_slug:'gaming-controllers' },
  { slug:'steam-controller', name:'Steam Controller', brand:'Valve', model_year:2015, description:'Valve unique controller with dual trackpads and single analog stick.', common_issues:['Trackpad haptic weak','Battery contacts corroded','Bumper button cracked','Wireless dongle lost'], is_popular:false, category_slug:'gaming-controllers' },
  { slug:'razer-wolverine-v2', name:'Razer Wolverine V2', brand:'Razer', model_year:2021, description:'Razer wired Xbox-compatible pro controller with hair-trigger locks.', common_issues:['Hair-trigger lock stiff','Multi-function button not mapped','Cable fraying','Stick module worn'], is_popular:false, category_slug:'gaming-controllers' },
  { slug:'8bitdo-sn30-pro', name:'8BitDo SN30 Pro', brand:'8BitDo', model_year:2018, description:'Retro-inspired Bluetooth controller for Switch, Android, and PC.', common_issues:['Bluetooth pairing fails','Analog stick drift','Start button sticking','Battery door loose'], is_popular:false, category_slug:'gaming-controllers' },
  { slug:'logitech-f310', name:'Logitech F310 Gamepad', brand:'Logitech', model_year:2010, description:'Budget wired USB gamepad for PC gaming.', common_issues:['D-pad unresponsive','Analog stick stiff','USB cable fraying','Trigger sticking'], is_popular:false, category_slug:'gaming-controllers' },
  { slug:'logitech-f710', name:'Logitech F710 Wireless Gamepad', brand:'Logitech', model_year:2010, description:'Wireless gamepad with nano receiver and vibration feedback.', common_issues:['Wireless connection dropping','Vibration motor dead','AA battery drain fast','Nano receiver lost'], is_popular:false, category_slug:'gaming-controllers' },
  { slug:'powera-enhanced-controller', name:'PowerA Enhanced Wired Controller', brand:'PowerA', model_year:2020, description:'Budget Xbox-licensed wired controller with programmable buttons.', common_issues:['Stick drift','Programmable buttons not saving','USB cable breaking at junction'], is_popular:false, category_slug:'gaming-controllers' },
  // Phones
  { slug:'iphone-15-pro', name:'iPhone 15 Pro', brand:'Apple', model_year:2023, description:'Apple flagship with titanium frame, A17 Pro chip, and USB-C.', common_issues:['Screen cracked','Battery draining fast','Camera lens scratched','USB-C port not charging','Overheating'], is_popular:true, category_slug:'phones' },
  { slug:'iphone-15', name:'iPhone 15', brand:'Apple', model_year:2023, description:'Apple iPhone 15 with Dynamic Island and USB-C.', common_issues:['Cracked screen','Battery health degraded','USB-C port debris','Rear glass cracked','Speaker muffled'], is_popular:true, category_slug:'phones' },
  { slug:'iphone-14', name:'iPhone 14', brand:'Apple', model_year:2022, description:'Apple iPhone 14 with Emergency SOS via satellite.', common_issues:['Cracked screen','Battery draining fast','Lightning port not charging','Rear glass broken','Face ID not working'], is_popular:true, category_slug:'phones' },
  { slug:'iphone-13', name:'iPhone 13', brand:'Apple', model_year:2021, description:'Apple iPhone 13 with improved battery and smaller notch.', common_issues:['Cracked screen','Battery swelling','Lightning port damaged','Camera module loose','Microphone not working'], is_popular:false, category_slug:'phones' },
  { slug:'samsung-galaxy-s24', name:'Samsung Galaxy S24', brand:'Samsung', model_year:2024, description:'Samsung flagship with Galaxy AI features and titanium frame.', common_issues:['Screen cracked','USB-C port loose','Battery draining fast','Back glass cracked','Fingerprint sensor not working'], is_popular:true, category_slug:'phones' },
  { slug:'samsung-galaxy-s23', name:'Samsung Galaxy S23', brand:'Samsung', model_year:2023, description:'Galaxy S23 with Snapdragon 8 Gen 2 and refined cameras.', common_issues:['Cracked screen','Back glass broken','Charging port issue','Battery life poor'], is_popular:false, category_slug:'phones' },
  { slug:'samsung-galaxy-s22', name:'Samsung Galaxy S22', brand:'Samsung', model_year:2022, description:'Galaxy S22 with contour cut camera and Armor Aluminum frame.', common_issues:['Screen damage','Battery swelling','USB-C port loose','Speaker grille clogged'], is_popular:false, category_slug:'phones' },
  { slug:'google-pixel-8', name:'Google Pixel 8', brand:'Google', model_year:2023, description:'Pixel 8 with Tensor G3 chip and 7-year software support.', common_issues:['Cracked screen','Battery draining fast','Overheating during calls','USB-C port issues'], is_popular:false, category_slug:'phones' },
  { slug:'google-pixel-7', name:'Google Pixel 7', brand:'Google', model_year:2022, description:'Pixel 7 with Tensor G2 and aluminum camera bar.', common_issues:['Screen cracked','Battery draining','Speaker quiet','Charging port intermittent'], is_popular:false, category_slug:'phones' },
  { slug:'oneplus-12', name:'OnePlus 12', brand:'OnePlus', model_year:2024, description:'OnePlus 12 with Snapdragon 8 Gen 3 and 100W charging.', common_issues:['Cracked screen','Alert slider stuck','Charging port damage','Battery draining'], is_popular:false, category_slug:'phones' },
  { slug:'motorola-edge-40', name:'Motorola Edge 40', brand:'Motorola', model_year:2023, description:'Motorola Edge 40 with curved pOLED display.', common_issues:['Curved screen cracked','USB-C port loose','Battery draining fast'], is_popular:false, category_slug:'phones' },
  // TV Remotes
  { slug:'samsung-smart-remote', name:'Samsung Smart TV Remote', brand:'Samsung', model_year:2021, description:'Samsung slim solar-powered Smart Remote for QLED TVs.', common_issues:['Buttons not responding','Solar charging not working','Battery contacts corroded','Remote not pairing'], is_popular:false, category_slug:'tv-remotes' },
  { slug:'lg-magic-remote', name:'LG Magic Remote', brand:'LG', model_year:2022, description:'LG pointer-based remote with voice control and scroll wheel.', common_issues:['Pointer not working','Scroll wheel stuck','Buttons sticking','Battery drain'], is_popular:false, category_slug:'tv-remotes' },
  { slug:'sony-bravia-remote', name:'Sony Bravia Remote', brand:'Sony', model_year:2022, description:'Sony Bravia XR remote with backlighting and Bluetooth.', common_issues:['Backlight not working','Google Assistant button broken','Bluetooth pairing fails'], is_popular:false, category_slug:'tv-remotes' },
  { slug:'roku-voice-remote', name:'Roku Voice Remote Pro', brand:'Roku', model_year:2021, description:'Roku rechargeable voice remote with private listening.', common_issues:['Voice button not activating','USB-C charge port intermittent','Pairing drops'], is_popular:false, category_slug:'tv-remotes' },
  { slug:'amazon-fire-tv-remote', name:'Amazon Fire TV Remote', brand:'Amazon', model_year:2021, description:'Amazon Alexa voice remote for Fire TV Stick.', common_issues:['Alexa button not working','Battery drain','Pairing issues','Navigation ring stuck'], is_popular:false, category_slug:'tv-remotes' },
  { slug:'apple-tv-siri-remote', name:'Apple TV Siri Remote (2nd Gen)', brand:'Apple', model_year:2021, description:'Apple redesigned Siri Remote with clickpad and USB-C.', common_issues:['Clickpad unresponsive','USB-C port damaged','Siri button not registering','Battery draining fast'], is_popular:false, category_slug:'tv-remotes' },
  { slug:'vizio-smartcast-remote', name:'Vizio SmartCast Remote', brand:'Vizio', model_year:2020, description:'Vizio backlit remote with dedicated streaming app buttons.', common_issues:['App shortcut buttons broken','Backlight dim','Battery corrosion','IR signal weak'], is_popular:false, category_slug:'tv-remotes' },
  // Electronics
  { slug:'macbook-pro-m3', name:'MacBook Pro (M3, 2023)', brand:'Apple', model_year:2023, description:'MacBook Pro with M3 chip, Liquid Retina XDR, and MagSafe 3.', common_issues:['Battery swelling','Screen backlight flickering','MagSafe port not charging','Keyboard key stuck','Fan loud'], is_popular:true, category_slug:'electronics' },
  { slug:'macbook-pro-m2', name:'MacBook Pro (M2, 2022)', brand:'Apple', model_year:2022, description:'MacBook Pro with M2 chip and notched display.', common_issues:['Battery capacity reduced','Keyboard key unresponsive','MagSafe not connecting','Screen cracks'], is_popular:false, category_slug:'electronics' },
  { slug:'macbook-pro-m1', name:'MacBook Pro (M1, 2020)', brand:'Apple', model_year:2020, description:'First MacBook Pro with Apple Silicon M1 chip.', common_issues:['Battery swelling','USB-C port damage','Display cable issue','Keyboard key stuck'], is_popular:false, category_slug:'electronics' },
  { slug:'ipad-pro', name:'iPad Pro (M2, 2022)', brand:'Apple', model_year:2022, description:'iPad Pro with M2 chip, ProMotion display, and Thunderbolt.', common_issues:['Screen cracked','Apple Pencil not connecting','USB-C port debris','Battery draining fast'], is_popular:false, category_slug:'electronics' },
  { slug:'ipad-air', name:'iPad Air (5th Gen)', brand:'Apple', model_year:2022, description:'iPad Air with M1 chip and USB-C.', common_issues:['Cracked screen','Touch ID button unresponsive','Battery draining','USB-C port loose'], is_popular:false, category_slug:'electronics' },
  { slug:'airpods-pro-2nd-gen', name:'AirPods Pro (2nd Gen)', brand:'Apple', model_year:2022, description:'AirPods Pro with active noise cancellation and MagSafe case.', common_issues:['ANC not working','One earbud not charging','Stem touch not registering','Case hinge loose','Static noise in one ear'], is_popular:false, category_slug:'electronics' },
  { slug:'airpods-pro-1st-gen', name:'AirPods Pro (1st Gen)', brand:'Apple', model_year:2019, description:'Original AirPods Pro with noise cancellation.', common_issues:['Crackling sound','ANC cutting out','Case not charging','Earbud not detected'], is_popular:false, category_slug:'electronics' },
  { slug:'sony-wh-1000xm5', name:'Sony WH-1000XM5', brand:'Sony', model_year:2022, description:'Sony flagship over-ear noise cancelling headphones.', common_issues:['Ear cup padding peeling','ANC weak','USB-C port loose','Headband cracking','Bluetooth dropout'], is_popular:false, category_slug:'electronics' },
  { slug:'nintendo-switch', name:'Nintendo Switch', brand:'Nintendo', model_year:2017, description:'Nintendo hybrid home/portable console.', common_issues:['Joy-Con rail loose','USB-C port not charging','SD card slot not reading','Dock not outputting HDMI','Fan loud'], is_popular:false, category_slug:'electronics' },
  { slug:'ps5-console', name:'PlayStation 5', brand:'Sony', model_year:2020, description:'Sony PS5 home console with SSD and haptic controller.', common_issues:['Disc drive not reading','HDMI port damage','USB-C port on front broken','Fan loud','Console not turning on'], is_popular:false, category_slug:'electronics' },
  { slug:'xbox-series-x', name:'Xbox Series X', brand:'Microsoft', model_year:2020, description:'Microsoft Xbox Series X home console.', common_issues:['Disc drive loud','HDMI port bent pins','Power button not responding','Fan grinding'], is_popular:false, category_slug:'electronics' },
  { slug:'kindle-paperwhite', name:'Kindle Paperwhite (11th Gen)', brand:'Amazon', model_year:2021, description:'Amazon premium e-reader with adjustable warm light.', common_issues:['Screen cracked','USB-C not charging','Battery draining fast','Touchscreen unresponsive'], is_popular:false, category_slug:'electronics' },
  { slug:'gopro-hero-12', name:'GoPro HERO12 Black', brand:'GoPro', model_year:2023, description:'GoPro action camera with HyperSmooth 6.0 stabilization.', common_issues:['Lens fogging','Battery door latch broken','USB-C port loose','Screen cracked','Microphone muffled underwater'], is_popular:false, category_slug:'electronics' },
];

// ── PARTS ────────────────────────────────────────────────────────────────────
const parts = [
  { device_slug:'ps5-dualsense', name:'Left Analog Stick Module', category:'joystick', description:'Alps replacement stick module for left stick drift.', price_usd_est:8, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=ps5+dualsense+left+stick'}] },
  { device_slug:'ps5-dualsense', name:'Right Analog Stick Module', category:'joystick', description:'Alps replacement stick module for right stick drift.', price_usd_est:8, buy_links:[] },
  { device_slug:'ps5-dualsense', name:'USB-C Charging Port', category:'port', description:'Replacement USB-C port board for DualSense charging issues.', price_usd_est:12, buy_links:[] },
  { device_slug:'ps5-dualsense', name:'1560mAh LiPo Battery', category:'battery', description:'Original capacity replacement battery.', price_usd_est:18, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=ps5+dualsense+battery'}] },
  { device_slug:'ps5-dualsense', name:'L2 Trigger Assembly', category:'trigger', description:'Left adaptive trigger mechanism replacement.', price_usd_est:15, buy_links:[] },
  { device_slug:'ps5-dualsense', name:'R2 Trigger Assembly', category:'trigger', description:'Right adaptive trigger mechanism replacement.', price_usd_est:15, buy_links:[] },
  { device_slug:'ps5-dualsense', name:'Touchpad Assembly', category:'touchpad', description:'Complete touchpad replacement.', price_usd_est:20, buy_links:[] },
  { device_slug:'ps4-dualshock-4', name:'Left Analog Stick Module', category:'joystick', description:'Alps replacement stick for DualShock 4 drift.', price_usd_est:6, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=dualshock+4+analog+stick'}] },
  { device_slug:'ps4-dualshock-4', name:'Right Analog Stick Module', category:'joystick', description:'Right stick replacement module.', price_usd_est:6, buy_links:[] },
  { device_slug:'ps4-dualshock-4', name:'Micro-USB Charging Port', category:'port', description:'Micro-USB port replacement for charging issues.', price_usd_est:5, buy_links:[] },
  { device_slug:'ps4-dualshock-4', name:'1000mAh LiPo Battery', category:'battery', description:'Replacement battery for all DualShock 4 versions.', price_usd_est:12, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=dualshock+4+battery'}] },
  { device_slug:'ps4-dualshock-4', name:'L2 Trigger Spring', category:'trigger', description:'Replacement spring for L2 trigger.', price_usd_est:3, buy_links:[] },
  { device_slug:'ps4-dualshock-4', name:'R2 Trigger Spring', category:'trigger', description:'Replacement spring for R2 trigger.', price_usd_est:3, buy_links:[] },
  { device_slug:'xbox-series-x-controller', name:'Left Analog Stick Module', category:'joystick', description:'Potentiometer stick module for Xbox Series controller drift.', price_usd_est:8, buy_links:[] },
  { device_slug:'xbox-series-x-controller', name:'Right Analog Stick Module', category:'joystick', description:'Right stick replacement module.', price_usd_est:8, buy_links:[] },
  { device_slug:'xbox-series-x-controller', name:'Left Bumper Button (LB)', category:'button', description:'LB bumper button plastic replacement.', price_usd_est:5, buy_links:[] },
  { device_slug:'xbox-series-x-controller', name:'Right Bumper Button (RB)', category:'button', description:'RB bumper button plastic replacement.', price_usd_est:5, buy_links:[] },
  { device_slug:'xbox-series-x-controller', name:'USB-C Port Board', category:'port', description:'USB-C charging and data port replacement board.', price_usd_est:10, buy_links:[] },
  { device_slug:'nintendo-switch-pro-controller', name:'Left Analog Stick Module', category:'joystick', description:'Alps stick module for Pro Controller drift repair.', price_usd_est:8, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=switch+pro+controller+stick'}] },
  { device_slug:'nintendo-switch-pro-controller', name:'Right Analog Stick Module', category:'joystick', description:'Right stick module replacement.', price_usd_est:8, buy_links:[] },
  { device_slug:'nintendo-switch-pro-controller', name:'USB-C Charging Port', category:'port', description:'Charging port board replacement.', price_usd_est:10, buy_links:[] },
  { device_slug:'nintendo-switch-pro-controller', name:'1300mAh LiPo Battery', category:'battery', description:'Replacement battery for Switch Pro Controller.', price_usd_est:15, buy_links:[] },
  { device_slug:'joy-con-left', name:'Left Analog Stick Module', category:'joystick', description:'Alps stick module - the primary fix for Joy-Con drift.', price_usd_est:7, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=joy-con+analog+stick'}] },
  { device_slug:'joy-con-left', name:'520mAh LiPo Battery', category:'battery', description:'Left Joy-Con replacement battery.', price_usd_est:10, buy_links:[] },
  { device_slug:'joy-con-left', name:'Rail Flex Cable', category:'cable', description:'Flex cable connecting Joy-Con to the rail connector.', price_usd_est:6, buy_links:[] },
  { device_slug:'joy-con-right', name:'Right Analog Stick Module', category:'joystick', description:'Alps stick module for right Joy-Con drift.', price_usd_est:7, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=joy-con+analog+stick'}] },
  { device_slug:'joy-con-right', name:'520mAh LiPo Battery', category:'battery', description:'Right Joy-Con replacement battery.', price_usd_est:10, buy_links:[] },
  { device_slug:'steam-deck', name:'Left Analog Stick Module', category:'joystick', description:'Steam Deck left stick replacement.', price_usd_est:12, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=steam+deck+analog+stick'}] },
  { device_slug:'steam-deck', name:'Right Analog Stick Module', category:'joystick', description:'Steam Deck right stick replacement.', price_usd_est:12, buy_links:[] },
  { device_slug:'steam-deck', name:'40Wh LiPo Battery', category:'battery', description:'Steam Deck main battery replacement.', price_usd_est:50, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=steam+deck+battery'}] },
  { device_slug:'steam-deck', name:'7" LCD Screen Assembly', category:'screen', description:'Complete display replacement for Steam Deck.', price_usd_est:80, buy_links:[] },
  { device_slug:'steam-deck', name:'USB-C Port Board', category:'port', description:'USB-C charging and dock port replacement.', price_usd_est:20, buy_links:[] },
  { device_slug:'steam-deck', name:'Cooling Fan', category:'cooling', description:'Replacement fan for loud or grinding fan issues.', price_usd_est:25, buy_links:[] },
  { device_slug:'iphone-15-pro', name:'OLED Screen Assembly', category:'screen', description:'Complete OLED display with Face ID sensors intact.', price_usd_est:280, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=iphone+15+pro+screen'}] },
  { device_slug:'iphone-15-pro', name:'3274mAh Battery', category:'battery', description:'Replacement battery for iPhone 15 Pro.', price_usd_est:35, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=iphone+15+pro+battery'}] },
  { device_slug:'iphone-15-pro', name:'USB-C Port Flex', category:'port', description:'USB-C charging and Thunderbolt port flex cable.', price_usd_est:30, buy_links:[] },
  { device_slug:'iphone-15-pro', name:'Rear Camera Module', category:'camera', description:'Complete rear triple camera system replacement.', price_usd_est:180, buy_links:[] },
  { device_slug:'iphone-15', name:'OLED Screen Assembly', category:'screen', description:'Dynamic Island OLED display for iPhone 15.', price_usd_est:220, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=iphone+15+screen'}] },
  { device_slug:'iphone-15', name:'3349mAh Battery', category:'battery', description:'Replacement battery for iPhone 15.', price_usd_est:30, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=iphone+15+battery'}] },
  { device_slug:'iphone-14', name:'OLED Screen Assembly', category:'screen', description:'Full OLED display with TrueDepth camera.', price_usd_est:190, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=iphone+14+screen'}] },
  { device_slug:'iphone-14', name:'3279mAh Battery', category:'battery', description:'iPhone 14 replacement battery.', price_usd_est:28, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=iphone+14+battery'}] },
  { device_slug:'iphone-14', name:'Lightning Charge Port Flex', category:'port', description:'Lightning port flex cable and microphone assembly.', price_usd_est:15, buy_links:[] },
  { device_slug:'iphone-13', name:'OLED Screen Assembly', category:'screen', description:'iPhone 13 display assembly.', price_usd_est:130, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=iphone+13+screen'}] },
  { device_slug:'iphone-13', name:'3227mAh Battery', category:'battery', description:'iPhone 13 replacement battery.', price_usd_est:22, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=iphone+13+battery'}] },
  { device_slug:'samsung-galaxy-s24', name:'Dynamic AMOLED Screen Assembly', category:'screen', description:'Galaxy S24 complete screen replacement.', price_usd_est:200, buy_links:[] },
  { device_slug:'samsung-galaxy-s24', name:'4000mAh Battery', category:'battery', description:'Galaxy S24 battery replacement.', price_usd_est:30, buy_links:[] },
  { device_slug:'samsung-galaxy-s24', name:'USB-C Charging Port', category:'port', description:'USB-C port flex cable for S24.', price_usd_est:18, buy_links:[] },
  { device_slug:'google-pixel-8', name:'OLED Screen Assembly', category:'screen', description:'Pixel 8 display replacement.', price_usd_est:180, buy_links:[] },
  { device_slug:'google-pixel-8', name:'4575mAh Battery', category:'battery', description:'Pixel 8 battery replacement.', price_usd_est:32, buy_links:[] },
  { device_slug:'macbook-pro-m3', name:'Battery Assembly', category:'battery', description:'MacBook Pro M3 14" battery pack (6 cells).', price_usd_est:130, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=macbook+pro+m3+battery'}] },
  { device_slug:'macbook-pro-m3', name:'Liquid Retina XDR Display Assembly', category:'screen', description:'Complete display replacement for MacBook Pro M3 14".', price_usd_est:450, buy_links:[] },
  { device_slug:'macbook-pro-m3', name:'MagSafe 3 Charging Port', category:'port', description:'MagSafe 3 board and cable assembly.', price_usd_est:60, buy_links:[] },
  { device_slug:'macbook-pro-m3', name:'Keyboard (US English)', category:'keyboard', description:'Full keyboard assembly replacement.', price_usd_est:180, buy_links:[] },
  { device_slug:'macbook-pro-m3', name:'Cooling Fan (Left)', category:'cooling', description:'Left cooling fan replacement.', price_usd_est:40, buy_links:[] },
  { device_slug:'macbook-pro-m1', name:'Battery Assembly', category:'battery', description:'MacBook Pro M1 13" battery (58.2Wh).', price_usd_est:90, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=macbook+pro+m1+battery'}] },
  { device_slug:'nintendo-switch', name:'USB-C Charging Port', category:'port', description:'Switch main board USB-C port.', price_usd_est:15, buy_links:[] },
  { device_slug:'nintendo-switch', name:'4310mAh Battery', category:'battery', description:'Nintendo Switch console battery replacement.', price_usd_est:25, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=nintendo+switch+battery'}] },
  { device_slug:'nintendo-switch', name:'6.2" LCD Screen', category:'screen', description:'Nintendo Switch touchscreen LCD replacement.', price_usd_est:45, buy_links:[{store:'iFixit',label:'Buy on iFixit',url:'https://www.ifixit.com/Search?query=nintendo+switch+screen'}] },
  { device_slug:'airpods-pro-2nd-gen', name:'Ear Tip Set (S/M/L)', category:'accessory', description:'Silicone ear tips for better seal and noise cancellation.', price_usd_est:12, buy_links:[{store:'Amazon',label:'Buy on Amazon',url:'https://www.amazon.com/s?k=airpods+pro+2+ear+tips'}] },
  { device_slug:'sony-wh-1000xm5', name:'Ear Cushion Set', category:'cushion', description:'Replacement ear pad cushions - fixes peeling vinyl issue.', price_usd_est:22, buy_links:[{store:'Amazon',label:'Buy on Amazon',url:'https://www.amazon.com/s?k=sony+xm5+ear+cushion+replacement'}] },
  { device_slug:'sony-wh-1000xm5', name:'USB-C Charging Port', category:'port', description:'Charging port board replacement.', price_usd_est:18, buy_links:[] },
  { device_slug:'kindle-paperwhite', name:'E-ink Display Module', category:'screen', description:'6.8" E-ink display replacement.', price_usd_est:55, buy_links:[] },
  { device_slug:'kindle-paperwhite', name:'1750mAh Battery', category:'battery', description:'Kindle Paperwhite battery replacement.', price_usd_est:18, buy_links:[] },
  { device_slug:'gopro-hero-12', name:'Enduro Battery', category:'battery', description:'Official GoPro Enduro rechargeable battery.', price_usd_est:25, buy_links:[{store:'Amazon',label:'Buy on Amazon',url:'https://www.amazon.com/s?k=gopro+enduro+battery+hero12'}] },
  { device_slug:'gopro-hero-12', name:'Lens Replacement Kit', category:'lens', description:'Replacement protective lens for HERO12.', price_usd_est:12, buy_links:[{store:'Amazon',label:'Buy on Amazon',url:'https://www.amazon.com/s?k=gopro+hero+12+lens+replacement'}] },
  { device_slug:'ps5-console', name:'HDMI Port', category:'port', description:'PS5 HDMI 2.1 port replacement.', price_usd_est:25, buy_links:[] },
  { device_slug:'ps5-console', name:'Disc Drive Assembly', category:'drive', description:'Complete disc drive assembly for PS5 disc edition.', price_usd_est:95, buy_links:[] },
  { device_slug:'ps5-console', name:'Cooling Fan', category:'cooling', description:'PS5 main cooling fan replacement.', price_usd_est:35, buy_links:[] },
  { device_slug:'xbox-series-x', name:'HDMI Port', category:'port', description:'Xbox Series X HDMI 2.1 port replacement.', price_usd_est:22, buy_links:[] },
  { device_slug:'xbox-series-x', name:'Disc Drive Assembly', category:'drive', description:'Xbox Series X optical disc drive.', price_usd_est:75, buy_links:[] },
  { device_slug:'gamecube-controller', name:'C-Stick Module', category:'joystick', description:'Replacement C-stick potentiometer module.', price_usd_est:5, buy_links:[] },
  { device_slug:'gamecube-controller', name:'L Trigger Spring', category:'trigger', description:'Trigger spring for L button analog depth.', price_usd_est:2, buy_links:[] },
  { device_slug:'gamecube-controller', name:'R Trigger Spring', category:'trigger', description:'Trigger spring for R button analog depth.', price_usd_est:2, buy_links:[] },
  { device_slug:'samsung-galaxy-s23', name:'AMOLED Screen Assembly', category:'screen', description:'Galaxy S23 display replacement.', price_usd_est:175, buy_links:[] },
  { device_slug:'samsung-galaxy-s23', name:'3900mAh Battery', category:'battery', description:'Galaxy S23 battery replacement.', price_usd_est:28, buy_links:[] },
  { device_slug:'google-pixel-7', name:'OLED Screen Assembly', category:'screen', description:'Pixel 7 display replacement.', price_usd_est:160, buy_links:[] },
  { device_slug:'google-pixel-7', name:'4355mAh Battery', category:'battery', description:'Pixel 7 battery replacement.', price_usd_est:28, buy_links:[] },
  { device_slug:'ipad-pro', name:'Liquid Retina XDR Screen', category:'screen', description:'iPad Pro M2 11" display replacement.', price_usd_est:280, buy_links:[] },
  { device_slug:'ipad-pro', name:'7538mAh Battery', category:'battery', description:'iPad Pro M2 11" battery replacement.', price_usd_est:55, buy_links:[] },
  { device_slug:'ipad-air', name:'Liquid Retina Display', category:'screen', description:'iPad Air 5th gen 10.9" display.', price_usd_est:180, buy_links:[] },
  { device_slug:'ipad-air', name:'7606mAh Battery', category:'battery', description:'iPad Air 5th gen battery replacement.', price_usd_est:45, buy_links:[] },
  { device_slug:'lg-magic-remote', name:'Scroll Wheel Assembly', category:'button', description:'Replacement scroll wheel for LG Magic Remote.', price_usd_est:8, buy_links:[] },
  { device_slug:'apple-tv-siri-remote', name:'USB-C Charging Port', category:'port', description:'Siri Remote USB-C port replacement.', price_usd_est:15, buy_links:[] },
  { device_slug:'oneplus-12', name:'LTPO AMOLED Screen', category:'screen', description:'OnePlus 12 display replacement.', price_usd_est:190, buy_links:[] },
  { device_slug:'oneplus-12', name:'5400mAh Battery', category:'battery', description:'OnePlus 12 battery replacement.', price_usd_est:30, buy_links:[] },
  { device_slug:'motorola-edge-40', name:'pOLED Screen Assembly', category:'screen', description:'Motorola Edge 40 curved display replacement.', price_usd_est:120, buy_links:[] },
  { device_slug:'motorola-edge-40', name:'4400mAh Battery', category:'battery', description:'Edge 40 battery replacement.', price_usd_est:25, buy_links:[] },
];

async function seed() {
  // Categories already seeded — just get the map
  const { data: catRows } = await supabase.from('categories').select('id, slug');
  const catMap = Object.fromEntries(catRows.map(c => [c.slug, c.id]));

  console.log('Seeding devices...');
  let dOk = 0, dFail = 0;
  for (const d of devices) {
    const { category_slug, ...rest } = d;
    const { error } = await supabase.from('devices').upsert(
      { ...rest, category_id: catMap[category_slug] ?? null },
      { onConflict: 'slug' }
    );
    if (error) { console.error('  FAIL', d.slug, ':', error.message); dFail++; }
    else dOk++;
  }
  console.log(`Devices: ${dOk} ok, ${dFail} failed`);

  const { data: devRows } = await supabase.from('devices').select('id, slug');
  const devMap = Object.fromEntries(devRows.map(d => [d.slug, d.id]));

  console.log('Seeding parts...');
  let pOk = 0, pFail = 0;
  for (const p of parts) {
    const { device_slug, ...rest } = p;
    const device_id = devMap[device_slug];
    if (!device_id) { console.warn('  SKIP part', p.name, '- device not found:', device_slug); continue; }
    const { error } = await supabase.from('parts').insert({ ...rest, device_id });
    if (error && !error.message.includes('duplicate')) {
      console.error('  FAIL part', p.name, ':', error.message); pFail++;
    } else pOk++;
  }
  console.log(`Parts: ${pOk} ok, ${pFail} failed`);
  console.log('Done!');
}

seed().catch(console.error);
