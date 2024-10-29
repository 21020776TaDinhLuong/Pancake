import Fanpage from "../models/fanpageModel";
async function createFanpage(name, description) {
    const fanpage = new Fanpage({ name, description });
    await fanpage.save();
    return fanpage;
}
