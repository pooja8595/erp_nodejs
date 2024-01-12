const path = require("path");
const db = require("../../models/index");
const Document_Channelpartner = db.Document_Channel_Partner;
const channelPartnerDetail = db.channelPartner
const other_document = db.other_docs
// const baseUrl = "https://emerp.elitetraveltech.in/";
// const baseUrl = "https://emerp.elitetraveltech.in/";
const baseUrl = "https://emerp.elitetraveltech.in/";

/////////////// Create Document_Channel_Partner ///////////////

exports.Document_Channel_Partner = async (req, res) => {
  try {
    const channelPartnerId = req.params.id;

    const document_remark = req.body.document_remark;
    var vendor_Reg_Form = req.files.vendor_Reg_Form == undefined ? "" : vendor_Reg_Form = req.files.vendor_Reg_Form[0].path;
    var NDA_WordFormat = req.files.NDA_WordFormat == undefined ? "" : (NDA_WordFormat = req.files.NDA_WordFormat[0].path);
    var acceptance_offer = req.files.acceptance_offer == undefined ? "" : (acceptance_offer = req.files.acceptance_offer[0].path);
    var agreement = req.files.agreement == undefined ? "" : (agreement = req.files.agreement[0].path);
    var vendor_declarations = req.files.vendor_declarations == undefined ? "" : (vendor_declarations = req.files.vendor_declarations[0].path);
    var Whistle_Blower_Policy = req.files.Whistle_Blower_Policy == undefined ? "" : (dqsIndiaSop = req.files.Whistle_Blower_Policy[0].path);

    const getchannelPartnerId = await channelPartnerDetail.findOne({ channel_partner_id: channelPartnerId })

    if (getchannelPartnerId) {
      const response = await Document_Channelpartner.create({
        channel_partner_id: channelPartnerId,
        vendor_Reg_Form: baseUrl + vendor_Reg_Form,
        NDA_WordFormat: baseUrl + NDA_WordFormat,
        acceptance_offer: baseUrl + acceptance_offer,
        agreement: baseUrl + agreement,
        vendor_declarations: baseUrl + vendor_declarations,
        Whistle_Blower_Policy: baseUrl + Whistle_Blower_Policy,
        Remarks: document_remark
      });
      return res.status(200).send({ code: 200, message: "Document Channel Partner Created Successfully!", data: response });
    } else {
      return res.status(404).send({ code: 404, message: "No Id Found" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Create Other Documents ///////////////

exports.createOtherDocuments = async (req, res) => {
  try {
    const channelPartnerId = req.params.id;
    const file_name = req.body.file_name;
    const otherFile = req.file.path == undefined ? " " : req.file.path;
    const findOthers = await channelPartnerDetail.findOne({ where: { channel_partner_id: channelPartnerId } });
    if (findOthers) {
      const create_other_doc = await other_document.create({
        channel_partner_id: channelPartnerId,
        file_name: file_name,
        other_docs: baseUrl + otherFile,
      });
      return res.status(200).send({ code: 200, message: "Created Other Document Successfully", data: create_other_doc });
    } else {
      return res.status(404).send({ code: 404, message: "No channel Partner Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};


/////////////// Read Document Channel Partner ///////////////

exports.Read_Document_Channelpartner = async (req, res) => {
  try {
    const getAlldata = await Document_Channelpartner.findAll();
    if (getAlldata) {
      return res.status(200).send({ code: 200, message: "Fetch All Data Successfully!", data: getAlldata });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Read Document Channel PartnerId ///////////////

exports.Read_Document_ChannelpartnerId = async (req, res) => {
  try {
    const channelPartnerId = req.params.id;
    const Document_byid = await Document_Channelpartner.findOne({
      where: { channel_partner_id: channelPartnerId },
      attributes: ['vendor_Reg_Form', 'NDA_WordFormat', 'acceptance_offer', 'agreement', 'vendor_declarations', 'Whistle_Blower_Policy', 'Remarks']
    });
    if (Document_byid) {
      return res.status(200).send({ code: 200, message: "Data loaded successfully", data: Document_byid });
    } else {
      return res.status(404).send({ code: 404, message: "Data Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Delete Document Channel PartnerId ///////////////

exports.Delete_Document_ChannelpartnerId = async (req, res) => {
  try {
    const channelPartnerId = req.params.id;
    const Delete_channel_partner = await Document_Channelpartner.findOne({ where: { channel_partner_id: channelPartnerId } });
    if (Delete_channel_partner) {
      const status_Update = await Delete_channel_partner.update({ status: "INACTIVE" }, { where: { channel_partner_id: channelPartnerId } });
      return res.status(200).send({ code: 200, message: "Channelpartner Document deleted successfully", data: status_Update });
    } else {
      return res.status(404).send({ code: 404, message: "No Data Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Update Document Channel Partner ///////////////

exports.Update_Document_Channelpartner = async (req, res) => {
  try {
    const channelPartnerId = req.params.id;
    const document_remark = req.body.document_remark;
    var vendor_Reg_Form = req.files.vendor_Reg_Form == undefined ? "" : (vendor_Reg_Form = req.files.vendor_Reg_Form[0].path);
    var NDA_WordFormat = req.files.NDA_WordFormat == undefined ? "" : (NDA_WordFormat = req.files.NDA_WordFormat[0].path);
    var acceptance_offer = req.files.acceptance_offer == undefined ? "" : (acceptance_offer = req.files.acceptance_offer[0].path);
    var agreement = req.files.agreement == undefined ? "" : (agreement = req.files.agreement[0].path);
    var vendor_declarations = req.files.vendor_declarations == undefined ? "" : (vendor_declarations = req.files.vendor_declarations[0].path);
    var Whistle_Blower_Policy = req.files.Whistle_Blower_Policy == undefined ? "" : (Whistle_Blower_Policy = req.files.Whistle_Blower_Policy[0].path);

    const findDocument = await Document_Channelpartner.findOne({ where: { channel_partner_id: channelPartnerId } });

    var vendor_Reg_Forms = vendor_Reg_Form == '' ? vendor_Reg_Form = findDocument.vendor_Reg_Form : vendor_Reg_Form = baseUrl + vendor_Reg_Form;
    var NDA_WordFormats = NDA_WordFormat == '' ? NDA_WordFormat = findDocument.NDA_WordFormat : NDA_WordFormat = baseUrl + NDA_WordFormat;
    var acceptance_offers = acceptance_offer == '' ? acceptance_offer = findDocument.acceptance_offer : acceptance_offer = baseUrl + acceptance_offer;
    var agreements = agreement == '' ? acceptance = findDocument.agreement : acceptance = baseUrl + agreement;
    var vendors_declarations = vendor_declarations == '' ? vendor_declarations = findDocument.vendor_declarations : vendor_declarations = baseUrl + vendor_declarations;
    var Whistle_Blower_Policys = Whistle_Blower_Policy == '' ? Whistle_Blower_Policy = findDocument.Whistle_Blower_Policy : Whistle_Blower_Policy = baseUrl + Whistle_Blower_Policy;

    if (findDocument) {
      const UpdateDocument = await Document_Channelpartner.update(
        {
          vendor_Reg_Form: vendor_Reg_Forms,
          NDA_WordFormat: NDA_WordFormats,
          acceptance_offer: acceptance_offers,
          agreement: agreements,
          vendor_declarations: vendors_declarations,
          Whistle_Blower_Policy: Whistle_Blower_Policys,
          Remarks: document_remark
        },
        { where: { channel_partner_id: channelPartnerId } }
      );
      return res.status(200).send({ code: 200, message: "Document successfully updated", data: UpdateDocument });
    } else {
      const createData = await Document_Channelpartner.create({
        channel_partner_id: channelPartnerId,
        vendor_Reg_Form: vendor_Reg_Forms,
        NDA_WordFormat: NDA_WordFormats,
        acceptance_offer: acceptance_offers,
        agreement: agreements,
        vendor_declarations: vendors_declarations,
        Whistle_Blower_Policy: Whistle_Blower_Policys,
        Remarks: document_remark
      })
      return res.status(200).send({ code: 200, message: "Document successfully updated", data: createData });
      // return res.status(404).send({ code: 404, message: "No ID found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Update Other Documents ///////////////

exports.updateOtherDocuments = async (req, res) => {
  try {
    const otherDocumentId = req.params.id;
    const file_name = req.body.file_name
    const Filepath = req.file.path == undefined ? " " : req.file.path
    const findId = await other_document.findOne({ where: { other_document_id: otherDocumentId } })
    if (findId) {
      const UpdateOthers = await other_document.update(
        {
          file_name: file_name,
          other_docs: baseUrl + Filepath
        },
        { where: { other_document_id: otherDocumentId } })
      return res.status(200).send({ code: 200, message: "Document Updated!", data: UpdateOthers })
    } else {
      return res.status(404).send({ code: 404, message: "No Data Found" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Parmanent Deleted Channel Partner Document ///////////////

exports.Parmanent_Deleted_Channelpartner_Document = async (req, res) => {
  try {
    const channelPartnerId = req.params.id;
    const findChannelPartner = await Document_Channelpartner.findOne({ where: { channel_partner_id: channelPartnerId } });
    if (findChannelPartner) {
      const Parmanent_Delete_channelpartnerDocument = await Document_Channelpartner.update(
        {
          vendor_Reg_Form: "NULL",
          NDA_WordFormat: "NULL",
          acceptance_offer: "NULL",
          agreement: "NULL",
          vendor_declarations: "NULL",
          Whistle_Blower_Policy: "NULL"
        },
        { where: { channel_partner_id: channelPartnerId } });
      return res.status(200).send({ code: 200, message: "Document Delete Successfully!", data: Parmanent_Delete_channelpartnerDocument });
    } else {
      return res.status(404).send({ code: 404, message: "No Document found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Del Other Docs ///////////////

exports.Del_Other_Docs = async (req, res) => {
  try {
    const document_id = req.params.id;
    const deleteOtherDocuments = await other_document.findOne({ where: { Document_id: document_id } })
    if (deleteOtherDocuments) {
      const Parmanent_Delete_otherDocuments = await other_document.update({ status: "INACTIVE" }, { where: { Document_id: document_id } })
      return res.status(200).send({ code: 200, message: "Document Delete Successfully", data: Parmanent_Delete_otherDocuments })
    } else {
      return res.status(404).send({ code: 404, message: "No Id Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}

/////////////// Read Other Documents ///////////////

exports.Read_Other_Documents = async (req, res) => {
  try {
    const channelPartnerId = parseInt(req.params.id);
    const otherDocumentDetails = await other_document.findAll({ where: { channel_partner_id: channelPartnerId } });
    if (otherDocumentDetails) {
      const ReadDocs = await other_document.findAll({ where: { status: "ACTIVE", channel_partner_id: channelPartnerId } })
      return res.status(200).send({ code: 200, message: "Data loaded successfully", data: ReadDocs });
    } else {
      return res.status(404).send({ code: 404, message: "Data Not Found", data: [] });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Download CP Document ///////////////

exports.download_CP_Document = (req, res) => {
  const fileName = req.params.fileName;
  let filePath = path.join(__dirname, '../../../Channel_Partner/');
  return res.download(filePath + fileName, (err) => {
    if (err) {
      return res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

/////////////////Download Files/////////////////////
exports.download_CP_Document = (req, res) => {
  const fileName = req.params.fileName;
  const filePath=path.join(__dirname,'../../../Channel_Partner/')
  res.download(filePath + fileName, (err) => {
      if (err) {
          res.status(500).send({
              message: "Could not download the file. " + err,
          });
      }
  });
};
