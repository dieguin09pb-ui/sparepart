export interface RepairStep {
  title: string;
  description: string;
}

export interface RepairGuide {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  time: string;
  tools: string[];
  steps: RepairStep[];
  warning?: string;
}

const batteryGuide = (deviceName: string): RepairGuide => ({
  id: "battery-replacement",
  title: "Battery Replacement",
  difficulty: "medium",
  time: "30–60 min",
  tools: ["Screwdriver set", "Spudger / pry tool", "Suction cup", "Tweezers", "Heat gun or hair dryer"],
  warning: "Dispose of old battery at a certified e-waste facility. Never puncture or bend a Li-Ion battery.",
  steps: [
    { title: "Power off the device", description: `Fully shut down your ${deviceName} before beginning any repair. This prevents short circuits and data corruption.` },
    { title: "Apply heat to loosen adhesive", description: "Use a heat gun or hair dryer on low setting (around 80°C / 175°F) around the edges for 60–90 seconds. This softens the adhesive holding the screen or back panel." },
    { title: "Open the device", description: "Use a suction cup to create a gap, then slide a thin pry tool or guitar pick around the seam. Work slowly — don't force it. Remove any screws first if visible." },
    { title: "Disconnect the battery connector", description: "Before touching anything inside, locate the battery connector (usually a white ribbon plug near the battery). Use a spudger to gently unplug it." },
    { title: "Remove the old battery", description: "Most batteries are held with adhesive pull-tabs. Pull the tab slowly at a low angle. If no tab is present, use isopropyl alcohol (90%+) around the edges and gently pry up the battery." },
    { title: "Clean the adhesive residue", description: "Use a cotton swab and isopropyl alcohol to clean any leftover adhesive from the battery bay. Let it dry fully." },
    { title: "Install the new battery", description: "Peel the backing off the new adhesive strips, lower the battery into position, and press firmly to bond it. Reconnect the battery connector — you should feel a small click." },
    { title: "Reassemble and test", description: "Snap the panel or screen back into place, replace any screws. Power on and verify the battery percentage shows correctly. Charge to 100% before heavy use." },
  ],
});

const screenGuide = (deviceName: string): RepairGuide => ({
  id: "screen-replacement",
  title: "Screen / Display Replacement",
  difficulty: "hard",
  time: "45–90 min",
  tools: ["Screwdriver set", "Suction cup", "Pry picks / spudger", "Heat gun", "Tweezers", "Adhesive strips"],
  warning: "LCD and OLED screens are fragile and expensive. Work over a soft surface. ESD wrist strap recommended.",
  steps: [
    { title: "Power off and remove SIM tray", description: `Shut down your ${deviceName} completely. Use an ejection pin to remove the SIM tray — this prevents it from interfering with reassembly.` },
    { title: "Heat the edges", description: "Apply heat (80–90°C) around all four edges for 90 seconds to soften the display adhesive. Don't overheat — excess heat damages OLED panels." },
    { title: "Create an opening", description: "Attach suction cup near the bottom edge. Pull upward while inserting a thin opening pick into the gap. Slide picks around all four corners slowly, breaking the adhesive seal." },
    { title: "Open like a book", description: "Hinge the screen open from the bottom, away from the top (where cables are located). Use a prop or box to hold it open at 90°." },
    { title: "Disconnect all display cables", description: "Remove the bracket screws over the display connector area. Use a spudger to disconnect the display ribbon cables — there are usually 2–4. Also disconnect the battery first." },
    { title: "Remove the old screen", description: "The screen is now free. Set it aside on a soft cloth. Inspect the frame for any bent tabs or broken clips." },
    { title: "Transfer components to new screen", description: "If your replacement screen doesn't include the earpiece, sensors, or home button, carefully transfer them from the old screen using a spudger and small screwdrivers." },
    { title: "Connect new screen and test", description: "Reconnect the display cables before fully seating the screen. Power on briefly to confirm the display works, touch response is correct, and no dead pixels are visible." },
    { title: "Apply new adhesive and seal", description: "Apply fresh adhesive strips around the frame. Press the screen down firmly and evenly, starting from the top. Use a clamp or rubber bands and let sit for 10 minutes." },
    { title: "Replace screws and SIM tray", description: "Reinsert all screws. Replace the SIM tray. Power on and test all functions — touch, face ID/fingerprint, and brightness." },
  ],
});

const chargingPortGuide = (deviceName: string, connector: string): RepairGuide => ({
  id: "charging-port-repair",
  title: `${connector} Charging Port Repair`,
  difficulty: "medium",
  time: "20–45 min",
  tools: ["Screwdriver set", "Spudger", "Tweezers", "Soldering iron (if board-level)"],
  steps: [
    { title: "Diagnose the issue first", description: `Before replacing the port, try cleaning it. Use a toothpick or compressed air to remove lint from the ${deviceName}'s port. A dirty port is the #1 cause of charging issues.` },
    { title: "Try a different cable and charger", description: "Rule out a faulty cable or charger. Test with at least 2 different cables. If the device charges wirelessly but not via cable, the port is likely the culprit." },
    { title: "Open the device", description: "Follow the battery replacement steps 1–3 to open the device. Disconnect the battery connector before proceeding." },
    { title: "Locate the charging port flex or board", description: `The ${connector} port is typically on a flex cable at the bottom of the device, secured with 1–3 screws and a connector. Some devices have it soldered to the main board.` },
    { title: "Disconnect and remove the old port", description: "Remove screws holding the port assembly. Use a spudger to disconnect the flex cable connector. Slide out the old port assembly." },
    { title: "Install the new port", description: "Slide the new port assembly into position, reconnect the flex cable connector (you'll feel it click), and replace the screws." },
    { title: "Reassemble and test", description: "Reconnect the battery, close the device, and test charging immediately. Verify data transfer works too if applicable." },
  ],
});

const stickDriftGuide = (deviceName: string): RepairGuide => ({
  id: "stick-drift-fix",
  title: "Fix Stick Drift (Thumbstick Replacement)",
  difficulty: "medium",
  time: "30–60 min",
  tools: ["T8 or T9 Torx screwdriver", "Phillips #00 screwdriver", "Spudger", "Tweezers", "Solderless thumbstick module"],
  steps: [
    { title: "Try the quick fix first", description: `Spray compressed air into the base of the thumbstick in short bursts. Rotate the stick while spraying. For 30% of cases, debris under the stick cap is the issue and this clears it.` },
    { title: "Calibrate before opening", description: `Check your system settings for controller calibration. On PS5 go to Settings → Accessories → Controllers. Sometimes miscalibration mimics drift and can be fixed in software.` },
    { title: "Remove the back shell screws", description: `Use a T8/T9 Torx (Xbox/PS5) or Y00 tri-point (Nintendo) screwdriver to remove the back panel screws. There are usually 4–6 screws, some hidden under grip pads or labels.` },
    { title: "Separate the shell halves", description: "Use a spudger to carefully pry apart the front and back shells. Don't yank — there are internal ribbon cables connecting the two halves. Open like a book." },
    { title: "Disconnect the thumbstick ribbon cable", description: "Locate the small ribbon cable connecting the thumbstick PCB. Use a spudger to flip up the ZIF (zero insertion force) connector latch, then slide out the ribbon cable." },
    { title: "Unscrew and remove the thumbstick module", description: "The thumbstick module is held by 2–3 small Phillips screws. Remove them and lift out the old module." },
    { title: "Install the new thumbstick module", description: "Drop in the new module, align the screw holes, and replace the screws. Do not overtighten — strip-proof threads are small." },
    { title: "Reconnect ribbon cable", description: "Slide the ribbon cable into the ZIF connector and press down the latch to lock it. The cable should sit flush with no bowing." },
    { title: "Test before fully reassembling", description: "Snap the shell halves together (don't screw yet). Connect to your console/PC and test both thumbsticks in all directions. Confirm no drift." },
    { title: "Close and screw back together", description: "Once confirmed working, press the shells together firmly and replace all screws. Don't forget any hidden under grip pads — peel them back and re-glue after." },
  ],
});

const triggerRepairGuide = (deviceName: string): RepairGuide => ({
  id: "trigger-repair",
  title: "Trigger Button Repair",
  difficulty: "easy",
  time: "20–40 min",
  tools: ["Torx screwdriver", "Spudger", "Tweezers"],
  steps: [
    { title: "Identify the problem", description: "Determine if the trigger is physically broken (cracked plastic, stuck) or has lost spring tension, or if it's a software/calibration issue (triggers not registering fully)." },
    { title: "Open the controller", description: "Remove back shell screws and separate the shell halves as described in the stick drift guide. Disconnect battery if possible." },
    { title: "Inspect the trigger mechanism", description: "Look at the trigger assembly — check if the plastic lever is cracked, if the spring is dislodged or broken, or if the trigger membrane is torn." },
    { title: "Replace the spring (if loose only)", description: "Springs often just pop out. Use tweezers to reseat the spring into its notch. This fixes about 40% of trigger issues for free." },
    { title: "Remove the full trigger assembly", description: "If the assembly needs replacing, unscrew the trigger bracket and disconnect any ribbon cable attached to it. Note the orientation before removing." },
    { title: "Install new trigger assembly", description: "Seat the new assembly, making sure the spring is in the correct slot and the trigger pivot point aligns. Reconnect ribbon cable if present." },
    { title: "Test range of motion", description: "Before closing, manually press the trigger and verify it travels the full range and springs back completely." },
    { title: "Reassemble and test", description: "Close the controller, replace screws, and test in a game with trigger-heavy mechanics to confirm full range and response." },
  ],
});

const macbookBatteryGuide = (): RepairGuide => ({
  id: "macbook-battery",
  title: "MacBook Battery Replacement",
  difficulty: "hard",
  time: "60–120 min",
  tools: ["P5 Pentalobe screwdriver", "T5 Torx screwdriver", "Spudger", "Isopropyl alcohol 90%+", "Plastic card / picks"],
  warning: "MacBook batteries are glued to the top case. Apple uses strong adhesive. Do NOT puncture the battery — swollen batteries are a fire hazard.",
  steps: [
    { title: "Back up your data", description: "Before opening your MacBook, back up to Time Machine or iCloud. Any repair carries a small risk of data loss." },
    { title: "Remove the bottom case", description: "Use a P5 pentalobe screwdriver to remove the 6 bottom screws (note: two screws near the hinge are longer). Lift the bottom case from the front edge." },
    { title: "Disconnect the battery connector first", description: "Find the battery connector near the trackpad side. Use a spudger to lift it straight up. This is critical — work with the battery disconnected to avoid shorts." },
    { title: "Remove screws from internal components", description: "Remove the T5 screws securing any bracket over the battery. There are typically 5 battery cells held to the top case with very strong adhesive." },
    { title: "Apply adhesive remover (isopropyl alcohol)", description: "Using a dropper or syringe, apply 90%+ isopropyl alcohol under the battery edges. Wait 2–3 minutes for it to penetrate and loosen the adhesive." },
    { title: "Slide a card under the battery", description: "Insert a plastic card (credit card thickness) under one corner of the battery and gently rock it back and forth. Work slowly — never use metal tools near the cells." },
    { title: "Repeat for all battery cells", description: "Work cell by cell, applying more alcohol as needed. It may take 10–15 minutes of patient work. The goal is to avoid bending any cell." },
    { title: "Install the new battery", description: "Peel the adhesive backing from the new battery and align it carefully in the bay. Press firmly on each cell to bond the adhesive." },
    { title: "Reconnect the battery connector", description: "Press the battery connector firmly onto the board until it clicks. Replace the T5 bracket screws." },
    { title: "Replace the bottom case and calibrate", description: "Replace bottom screws (longer ones go near the hinge). Power on, check System Information → Power to verify cycle count is low. Run a full charge cycle." },
  ],
});

const speakerRepairGuide = (deviceName: string): RepairGuide => ({
  id: "speaker-repair",
  title: "Speaker Repair / Replacement",
  difficulty: "easy",
  time: "15–30 min",
  tools: ["Screwdriver set", "Spudger", "Tweezers", "Compressed air"],
  steps: [
    { title: "Clean before replacing", description: `First try cleaning ${deviceName}'s speaker grille with compressed air and a soft brush. Lint and debris block speakers and are the most common cause of muffled audio.` },
    { title: "Test with headphones", description: "Plug in headphones. If audio is clear through headphones but not the speaker, the speaker hardware is the issue. If both are affected, it may be a software/audio chip problem." },
    { title: "Check software settings", description: "Check volume settings, mute switch, and Do Not Disturb. Try playing audio from multiple apps. Reset settings if needed (Settings → General → Transfer or Reset)." },
    { title: "Open the device", description: "Follow the battery replacement opening steps. Disconnect the battery before touching any internal components." },
    { title: "Locate and disconnect the speaker", description: "The speaker module is usually at the bottom of the device. It connects via a small ribbon cable. Use a spudger to disconnect it." },
    { title: "Remove speaker screws and module", description: "Remove 1–3 screws holding the speaker in place. Lift out the speaker module." },
    { title: "Install the new speaker", description: "Drop in the new module, align with screw holes, replace screws, and reconnect the ribbon cable." },
    { title: "Test before closing", description: "Reconnect the battery and test audio with the device open before sealing. Play different media to verify full frequency range." },
    { title: "Reseal and reassemble", description: "Close the device and replace all screws. Test again fully assembled." },
  ],
});

// Map guides to device slugs or category patterns
export const DEVICE_GUIDES: Record<string, RepairGuide[]> = {
  // iPhones
  "iphone-15-pro": [screenGuide("iPhone 15 Pro"), batteryGuide("iPhone 15 Pro"), chargingPortGuide("iPhone 15 Pro", "USB-C"), speakerRepairGuide("iPhone 15 Pro")],
  "iphone-15":     [screenGuide("iPhone 15"), batteryGuide("iPhone 15"), chargingPortGuide("iPhone 15", "USB-C"), speakerRepairGuide("iPhone 15")],
  "iphone-16-pro": [screenGuide("iPhone 16 Pro"), batteryGuide("iPhone 16 Pro"), chargingPortGuide("iPhone 16 Pro", "USB-C"), speakerRepairGuide("iPhone 16 Pro")],
  "iphone-17-pro": [screenGuide("iPhone 17 Pro"), batteryGuide("iPhone 17 Pro"), chargingPortGuide("iPhone 17 Pro", "USB-C"), speakerRepairGuide("iPhone 17 Pro")],
  "iphone-14":     [screenGuide("iPhone 14"), batteryGuide("iPhone 14"), chargingPortGuide("iPhone 14", "Lightning"), speakerRepairGuide("iPhone 14")],
  "iphone-13":     [screenGuide("iPhone 13"), batteryGuide("iPhone 13"), chargingPortGuide("iPhone 13", "Lightning"), speakerRepairGuide("iPhone 13")],
  "iphone-12-pro": [screenGuide("iPhone 12 Pro"), batteryGuide("iPhone 12 Pro"), chargingPortGuide("iPhone 12 Pro", "Lightning"), speakerRepairGuide("iPhone 12 Pro")],
  "iphone-11-pro": [screenGuide("iPhone 11 Pro"), batteryGuide("iPhone 11 Pro"), chargingPortGuide("iPhone 11 Pro", "Lightning"), speakerRepairGuide("iPhone 11 Pro")],
  "iphone-x":      [screenGuide("iPhone X"), batteryGuide("iPhone X"), chargingPortGuide("iPhone X", "Lightning"), speakerRepairGuide("iPhone X")],
  "iphone-xr":     [screenGuide("iPhone XR"), batteryGuide("iPhone XR"), chargingPortGuide("iPhone XR", "Lightning"), speakerRepairGuide("iPhone XR")],
  "iphone-9":      [screenGuide("iPhone SE (2020)"), batteryGuide("iPhone SE (2020)"), chargingPortGuide("iPhone SE (2020)", "Lightning")],
  "iphone-8":      [screenGuide("iPhone 8"), batteryGuide("iPhone 8"), chargingPortGuide("iPhone 8", "Lightning")],
  "iphone-7":      [screenGuide("iPhone 7"), batteryGuide("iPhone 7"), chargingPortGuide("iPhone 7", "Lightning")],
  // Samsung
  "samsung-galaxy-s24": [screenGuide("Galaxy S24"), batteryGuide("Galaxy S24"), chargingPortGuide("Galaxy S24", "USB-C"), speakerRepairGuide("Galaxy S24")],
  "samsung-galaxy-s23": [screenGuide("Galaxy S23"), batteryGuide("Galaxy S23"), chargingPortGuide("Galaxy S23", "USB-C"), speakerRepairGuide("Galaxy S23")],
  "samsung-galaxy-s22": [screenGuide("Galaxy S22"), batteryGuide("Galaxy S22"), chargingPortGuide("Galaxy S22", "USB-C"), speakerRepairGuide("Galaxy S22")],
  // Google Pixel
  "google-pixel-8": [screenGuide("Pixel 8"), batteryGuide("Pixel 8"), chargingPortGuide("Pixel 8", "USB-C"), speakerRepairGuide("Pixel 8")],
  "google-pixel-7": [screenGuide("Pixel 7"), batteryGuide("Pixel 7"), chargingPortGuide("Pixel 7", "USB-C"), speakerRepairGuide("Pixel 7")],
  // Other phones
  "oneplus-12":      [screenGuide("OnePlus 12"), batteryGuide("OnePlus 12"), chargingPortGuide("OnePlus 12", "USB-C")],
  "motorola-edge-40": [screenGuide("Motorola Edge 40"), batteryGuide("Motorola Edge 40"), chargingPortGuide("Motorola Edge 40", "USB-C")],
  // Controllers
  "ps5-dualsense":      [stickDriftGuide("PS5 DualSense"), triggerRepairGuide("PS5 DualSense"), batteryGuide("PS5 DualSense"), speakerRepairGuide("PS5 DualSense")],
  "ps5-dualsense-edge": [stickDriftGuide("PS5 DualSense Edge"), triggerRepairGuide("PS5 DualSense Edge"), batteryGuide("PS5 DualSense Edge")],
  "xbox-series-x-controller": [stickDriftGuide("Xbox Series X Controller"), triggerRepairGuide("Xbox Series X Controller"), batteryGuide("Xbox Series X Controller")],
  "xbox-one-controller":      [stickDriftGuide("Xbox One Controller"), triggerRepairGuide("Xbox One Controller"), batteryGuide("Xbox One Controller")],
  "xbox-360-controller":      [stickDriftGuide("Xbox 360 Controller"), triggerRepairGuide("Xbox 360 Controller")],
  "nintendo-switch-pro-controller": [stickDriftGuide("Switch Pro Controller"), triggerRepairGuide("Switch Pro Controller"), batteryGuide("Switch Pro Controller")],
  "joy-con-left":  [stickDriftGuide("Joy-Con (Left)"), batteryGuide("Joy-Con (Left)")],
  "joy-con-right": [stickDriftGuide("Joy-Con (Right)"), batteryGuide("Joy-Con (Right)")],
  // MacBooks
  "macbook-pro-m3": [macbookBatteryGuide(), screenGuide("MacBook Pro M3"), speakerRepairGuide("MacBook Pro M3")],
  "macbook-pro-m2": [macbookBatteryGuide(), screenGuide("MacBook Pro M2"), speakerRepairGuide("MacBook Pro M2")],
  "macbook-pro-m1": [macbookBatteryGuide(), screenGuide("MacBook Pro M1"), speakerRepairGuide("MacBook Pro M1")],
  // AirPods
  "airpods-pro-2nd-gen": [speakerRepairGuide("AirPods Pro (2nd Gen)"), batteryGuide("AirPods Pro (2nd Gen)")],
  "airpods-pro-1st-gen": [speakerRepairGuide("AirPods Pro (1st Gen)"), batteryGuide("AirPods Pro (1st Gen)")],
  "airpods-4":           [speakerRepairGuide("AirPods (4th Gen)"), batteryGuide("AirPods (4th Gen)")],
  // Sony headphones
  "sony-wh-1000xm5": [batteryGuide("Sony WH-1000XM5"), speakerRepairGuide("Sony WH-1000XM5"), chargingPortGuide("Sony WH-1000XM5", "USB-C")],
  // Nintendo Switch
  "nintendo-switch": [screenGuide("Nintendo Switch"), batteryGuide("Nintendo Switch"), chargingPortGuide("Nintendo Switch", "USB-C")],
  // TV Remotes
  "samsung-smart-remote":  [speakerRepairGuide("Samsung Smart Remote")],
  "lg-magic-remote":       [speakerRepairGuide("LG Magic Remote")],
  "sony-bravia-remote":    [speakerRepairGuide("Sony Bravia Remote")],
  "roku-voice-remote":     [speakerRepairGuide("Roku Voice Remote")],
  "amazon-fire-tv-remote": [speakerRepairGuide("Amazon Fire TV Remote")],
  "apple-tv-siri-remote":  [batteryGuide("Apple TV Siri Remote"), chargingPortGuide("Apple TV Siri Remote", "Lightning")],
  "vizio-smartcast-remote": [speakerRepairGuide("Vizio SmartCast Remote")],
};
