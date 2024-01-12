const db = require("../../models/index");
const provisionDetails = db.provisionDetail;
const channelPartnerDetail = db.channelPartner;
const LeadManagmentDetails = db.LeadManagment;
const createProvisionDetails = db.Create_Provision
const provisionRbhApprovalDetail = db.provisionRbhApproval
const channelPartnerProvisionPaymentDetails = db.channelPartnerProvisionPaymentDetail
const userDetails = db.user;

/////////////// Create Provision ///////////////

exports.create_Provision = async (req, res) => {
  try {
    const employee_id = req.params.id;
    const employee_data = await userDetails.findOne({ where: { employee_id: employee_id } });
    if (employee_data.user_role == "SP") {
      const { channel_partner_id, lead_genration_id, associated_company, CP_Name, s1_wo, s2_wo, product_request, msme_number, Assessment_Fee,
        delivery_month, requsted_incentive, special_incentive_amount, Agreed_prec_incentive, gst_number, invoice_number, invoice_date,
        status, invoice_submitted_By_CP, remarks, Provision_Created_By, Provision_Created_Date, provision_verified_by, provision_verified_date } = req.body;

      const findChannelPartner = await channelPartnerDetail.findOne({ where: { channel_partner_id: channel_partner_id } });

      if (findChannelPartner.channel_partner_id == channel_partner_id) {
        const leadData = await LeadManagmentDetails.findOne({ where: { lead_genration_id: lead_genration_id } })
        const provisionData = await provisionDetails.create(
          {
            channel_partner_id,
            lead_genration_id,
            cp_veriferId: findChannelPartner.cp_veriferId,
            cp_veriferName: findChannelPartner.cp_veriferName,
            associated_company,
            CP_Name,
            first_name: leadData.first_name,
            last_name: leadData.last_name,
            email: leadData.email,
            phone_number: leadData.phone_number,
            stage: leadData.stage || req.body.stage,
            street_address: leadData.street_address,
            standard_program_assement: leadData.standard_program_assement,
            status1: leadData.status,
            Cp_registration_Approver_id: findChannelPartner.Cp_registration_Approver_id,
            Cp_registration_Approver_name: findChannelPartner.Cp_registration_Approver_name,
            Cp_source_id: findChannelPartner.Cp_source_id,
            Cp_source_name: findChannelPartner.Cp_source_name,
            designation: findChannelPartner.designation,
            certificate_type_name: leadData.certificate_type_name,
            s1_wo,
            s2_wo,
            product_request,
            city: leadData.city,
            city_name: leadData.city_name,
            state: leadData.state,
            state_name: leadData.state_name,
            region: leadData.region,
            region_name: leadData.region_name,
            address2: leadData.address2,
            gst_number,
            msme_number,
            Assessment_Fee,
            delivery_month,
            sp_id: findChannelPartner.Contact_source_id,
            sp_name: findChannelPartner.Contact_source_name,
            requsted_incentive,
            special_incentive_amount,
            Agreed_prec_incentive,
            invoice_number,
            invoice_date,
            invoice_submitted_By_CP,
            remarks,
            Provision_Created_By,
            Provision_Created_Date,
            provision_verified_by,
            provision_verified_date,
            status
          },
          { where: { channel_partner_id: channel_partner_id } }
        );
        await createProvisionDetails.update({
          Provision_Created_By,
          Provision_Created_Date,
          status: provisionData.status
        }, { where: { lead_genration_id: lead_genration_id } })
        return res.status(200).send({ code: 200, message: "Provision Created Successfully!", data: provisionData });
      } else {
        return res.status(404).send({ code: 404, message: "Record Not Found" });
      }
    } else {
      return res.status(404).send({ code: 404, message: "Your Role is not SP" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Send To RBH And Verified Provision Details ///////////////

exports.send_To_RBH_And_Verified_Provision_Details = async (req, res) => {
  try {
    const provisionId = req.params.id;
    const { product_request, msme_number, Assessment_Fee, delivery_month, requsted_incentive, special_incentive_amount, Agreed_prec_incentive,
      invoice_number, invoice_date, invoice_submitted_By_CP, remarks, provision_payment_status } = req.body
    const provisionGetData = await provisionDetails.findOne({ where: { provision_id: provisionId } })
    // const lead_data = await LeadManagmentDetails.findOne({ where: { lead_genration_id: req.body.lead_genration_id } })
    if (req.body.status == "VERIFIED") {
      const updateData = await provisionDetails.update(req.body, { where: { provision_id: provisionId } })
      await createProvisionDetails.update({ status: req.body.status }, { where: { lead_genration_id: req.body.lead_genration_id } })
      const paymentData = await channelPartnerProvisionPaymentDetails.create({
        channel_partner_id: provisionGetData.channel_partner_id,
        // workOrder_no: lead_data.workOrder_no,
        lead_genration_id: provisionGetData.lead_genration_id,
        cp_veriferId: provisionGetData.cp_veriferId,
        cp_veriferName: provisionGetData.cp_veriferName,
        associated_company: provisionGetData.associated_company,
        CP_Name: provisionGetData.CP_Name,
        first_name: provisionGetData.first_name,
        last_name: provisionGetData.last_name,
        email: provisionGetData.email,
        phone_number: provisionGetData.phone_number,
        stage: provisionGetData.stage,
        street_address: provisionGetData.street_address,
        standard_program_assement: provisionGetData.standard_program_assement,
        status1: provisionGetData.status,
        Cp_registration_Approver_id: provisionGetData.Cp_registration_Approver_id,
        Cp_registration_Approver_name: provisionGetData.Cp_registration_Approver_name,
        Cp_source_id: provisionGetData.Cp_source_id,
        Cp_source_name: provisionGetData.Cp_source_name,
        designation: provisionGetData.designation,
        certificate_type_name: provisionGetData.certificate_type_name,
        s1_wo: provisionGetData.s1_wo,
        s2_wo: provisionGetData.s2_wo,
        product_request,
        city: provisionGetData.city,
        city_name: provisionGetData.city_name,
        state: provisionGetData.state,
        state_name: provisionGetData.state_name,
        region: provisionGetData.region,
        region_name: provisionGetData.region_name,
        address2: provisionGetData.address2,
        gst_number: provisionGetData.address2,
        msme_number,
        Assessment_Fee,
        delivery_month,
        sp_id: provisionGetData.sp_id,
        sp_name: provisionGetData.sp_name,
        requsted_incentive,
        special_incentive_amount,
        Agreed_prec_incentive,
        invoice_number,
        invoice_date,
        invoice_submitted_By_CP,
        remarks,
        Provision_Created_By: provisionGetData.Provision_Created_By,
        Provision_Created_Date: provisionGetData.Provision_Created_Date,
        provision_verified_by: provisionGetData.provision_verified_by,
        provision_verified_date: provisionGetData.provision_verified_date,
        provision_payment_status
      })
      return res.status(200).send({ code: 200, message: "Update Verified Provision Details Successfully!", data: updateData })
    } else {
      const sendRbhData = await provisionRbhApprovalDetail.create({
        channel_partner_id: provisionGetData.channel_partner_id,
        lead_genration_id: provisionGetData.lead_genration_id,
        cp_veriferId: provisionGetData.cp_veriferId,
        cp_veriferName: provisionGetData.cp_veriferName,
        associated_company: provisionGetData.associated_company,
        CP_Name: provisionGetData.CP_Name,
        first_name: provisionGetData.first_name,
        last_name: provisionGetData.last_name,
        email: provisionGetData.email,
        phone_number: provisionGetData.phone_number,
        stage: provisionGetData.stage,
        street_address: provisionGetData.street_address,
        standard_program_assement: provisionGetData.standard_program_assement,
        status1: provisionGetData.status,
        Cp_registration_Approver_id: provisionGetData.Cp_registration_Approver_id,
        Cp_registration_Approver_name: provisionGetData.Cp_registration_Approver_name,
        Cp_source_id: provisionGetData.Cp_source_id,
        Cp_source_name: provisionGetData.Cp_source_name,
        designation: provisionGetData.designation,
        certificate_type_name: provisionGetData.certificate_type_name,
        s1_wo: provisionGetData.s1_wo,
        s2_wo: provisionGetData.s2_wo,
        product_request,
        city: provisionGetData.city,
        city_name: provisionGetData.city_name,
        state: provisionGetData.state,
        state_name: provisionGetData.state_name,
        region: provisionGetData.region,
        region_name: provisionGetData.region_name,
        address2: provisionGetData.address2,
        gst_number: provisionGetData.address2,
        msme_number,
        Assessment_Fee,
        delivery_month,
        sp_id: provisionGetData.sp_id,
        sp_name: provisionGetData.sp_name,
        requsted_incentive,
        special_incentive_amount,
        Agreed_prec_incentive,
        invoice_number,
        invoice_date,
        invoice_submitted_By_CP,
        remarks,
        Provision_Created_By: provisionGetData.Provision_Created_By,
        Provision_Created_Date: provisionGetData.Provision_Created_Date,
        provision_verified_by: provisionGetData.provision_verified_by,
        provision_verified_date: provisionGetData.provision_verified_date,
        provision_payment_status
      })
      const updateData = await provisionDetails.update({ status: req.body.status }, { where: { provision_id: provisionId } })
      return res.status(200).send({ code: 200, message: "Send To RBH Created Successfully!", data: sendRbhData })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}

/////////////// Get All CP Payment List ///////////////

exports.get_All_CP_Payment_List = async (req, res) => {
  try {
    const paymentListData = await channelPartnerProvisionPaymentDetails.findAll()
    return res.status(200).send({ code: 200, message: "Fetch All CP Payment List Data Successfully!", data: paymentListData });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

exports.get_All_CP_Payment_List_BYID = async (req, res) => {
  try {
    const channel_partner_provision_Id= req.params.id;
    const channel_partner_provisionData = await channelPartnerProvisionPaymentDetails.findOne({ where: { channel_partner_provision_id: channel_partner_provision_Id } })
    return res.status(200).send({ code: 200, message: "Fetch All CP Payment BY ID List Data Successfully!", data: channel_partner_provisionData });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};


/////////////// Get All RBH Provision List ///////////////

exports.get_All_RBH_Provision_List = async (req, res) => {
  try {
    const employeeId = req.params.employee_id
    const userData = await userDetails.findOne({ where: { employee_id: employeeId } })
    if (userData.user_role == "RBH") {
      const provisionData = await provisionRbhApprovalDetail.findAll();
      return res.status(200).send({ code: 200, message: "Fetch All RBH Provision Data Successfully!", data: provisionData });
    } else {
      return res.status(405).send({ code: 405, message: "You are not RBH Head Approver" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Get ById RBH Provision List ///////////////

exports.get_ById_RBH_Provision_List = async (req, res) => {
  try {
    const provisionRbhApprovalId = req.params.id
    const provisionData = await provisionRbhApprovalDetail.findOne({ where: { provision_rbh_approval_id: provisionRbhApprovalId } });
    return res.status(200).send({ code: 200, message: "Fetch RBH Provision Data Successfully!", data: provisionData });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Verifing Provision Details ///////////////

exports.Verifing_provisionDetails = async (req, res) => {
  try {
    const provisionId = req.params.id;

    var CP_Name = req.body.CP_Name == undefined ? "" : (CP_Name = req.body.CP_Name);
    var Cert_Type = req.body.Cert_Type == undefined ? "" : (Cert_Type = req.body.Cert_Type);
    var S1_Wo = req.body.S1_Wo == undefined ? "" : (S1_Wo = req.body.S1_Wo);
    var S2_Wo = req.body.S2_Wo == undefined ? "" : (S2_Wo = req.body.S2_Wo);
    var Stage_and_serviceType = req.body.Stage_and_serviceType == undefined ? "" : (Stage_and_serviceType = req.body.Stage_and_serviceType);
    var Product = req.body.Product == undefined ? "" : (Product = req.body.Product);
    var Address = req.body.Address == undefined ? "" : (Address = req.body.Address);
    var GST_Number = req.body.GST_Number == undefined ? "" : (GST_Number = req.body.GST_Number);
    var MSME_Number = req.body.MSME_Number == undefined ? "" : (MSME_Number = req.body.MSME_Number);
    var Assessment_Fee = req.body.Assessment_Fee == undefined ? "" : (Assessment_Fee = req.body.Assessment_Fee);
    var Delivered_Month = req.body.Delivered_Month == undefined ? "" : (Delivered_Month = req.body.Delivered_Month);
    var SP_Name = req.body.SP_Name == undefined ? "" : (SP_Name = req.body.SP_Name);
    var Requested_Incentive = req.body.Requested_Incentive == undefined ? "" : (Requested_Incentive = req.body.Requested_Incentive);
    var special_Incentives_Amount = req.body.special_Incentives_Amount == undefined ? "" : (special_Incentives_Amount = req.body.Requested_Incentive_Amount);
    var Agreed_Incentives = req.body.Agreed_Incentives == undefined ? "" : (Agreed_Incentiveses = req.body.Agreed_Incentives);
    var Invoice_Number = req.body.Invoice_Number == undefined ? "" : (Invoice_Number = req.body.Invoice_Number);
    var Invoice_Date = req.body.Invoice_Date == undefined ? "" : (Invoice_Date = req.body.Invoice_Date);
    var Invoice_submitted_by_cp = req.body.Invoice_submitted_by_cp == undefined ? "" : (Invoice_submitted_by_cps = req.body.Invoice_submitted_by_cp);
    var Remarks = req.body.Remarks == undefined ? "" : (Remarks = req.body.Remarks);
    var status = req.body.status == undefined ? "" : (status = req.body.status);
    var Date_of_pay_Cp = req.body.Date_of_pay_Cp ? "" : (Date_of_pay_Cp = req.body.Date_of_pay_Cp);

    const findDetails = await provisionDetails.findOne({ where: { Provision_id: provisionId } });

    var CP_Names = CP_Name == "" ? (CP_Name = findDetails.CP_Name) : (CP_Name = CP_Name);
    var Cert_Types = Cert_Type == "" ? (Cert_Type = findDetails.Cert_Type) : (Cert_Type = Cert_Type);
    var S1_Wos = S1_Wo == "" ? (S1_Wo = findDetails.S1_Wo) : (S1_Wo = S1_Wo);
    var S2_Wos = (S2_Wo = "=" ? (S2_Wo = findDetails.S2_Wo) : (S2_Wo = S2_Wo));
    var Stage_and_serviceTypes = (Stage_and_serviceType = "" ? (Stage_and_serviceType = findDetails.Stage_and_serviceType) : (Stage_and_serviceType = Stage_and_serviceType));
    var Products = (Product = "" ? (Product = findDetails.Product) : (Product = Product));
    var Addresses = (Address = "" ? (Address = findDetails.Address) : (Address = Address));
    var GST_Numbers = (GST_Number = "" ? (GST_Number = findDetails.GST_Number) : (GST_Number = GST_Number));
    var MSME_Numbers = (MSME_Number = "" ? (MSME_Number = findDetails.MSME_Number) : (MSME_Number = MSME_Number));
    var Assessment_Fees = (Assessment_Fee = "" ? (Assessment_Fee = findDetails.Assessment_Fee) : (Assessment_Fee = Assessment_Fee));
    var Delivered_Months = (Delivered_Month = "" ? (Delivered_Month = findDetails.Delivered_Month) : (Delivered_Month = Delivered_Month));
    var SP_Names = (SP_Name = "" ? (SP_Name = findDetails.SP_Name) : (SP_Name = SP_Name));
    var Requested_Incentives = (Requested_Incentive = "" ? (Requested_Incentive = findDetails.Requested_Incentive) : (Requested_Incentive = Requested_Incentive));
    var special_Incentives_Amounts = (special_Incentives_Amount = "" ? (special_Incentives_Amount = findDetails.special_Incentives_Amount) : (special_Incentives_Amount = special_Incentives_Amount));
    var Agreed_Incentiveses = (Agreed_Incentives = "" ? (Agreed_Incentives = findDetails.Agreed_Incentives) : (Agreed_Incentives = Agreed_Incentives));
    var Invoice_Numbers = (Invoice_Number = "" ? (Invoice_Number = findDetails.Invoice_Number) : (Invoice_Number = Invoice_Number));
    var Invoice_Dates = (Invoice_Date = "" ? (Invoice_Date = findDetails.Invoice_Date) : (Invoice_Date = Invoice_Date));
    var Invoice_submitted_by_cps = (Invoice_submitted_by_cp = "" ? (Invoice_submitted_by_cp = findDetails.Invoice_submitted_by_cp) : (Invoice_submitted_by_cp = Invoice_submitted_by_cp));
    var Remark = (Remarks = "" ? (Remarks = findDetails.Remarks) : (Remarks = Remarks));
    var statuses = (status = "" ? (status = findDetails.status) : (status = status));
    var Date_of_pay_Cps = (Date_of_pay_Cp = "" ? (Date_of_pay_Cp = findDetails.Date_of_pay_Cp) : (Date_of_pay_Cp = Date_of_pay_Cp));

    if (findDetails) {
      const provisionData = await provisionDetails.update(
        {
          CP_Name: CP_Names,
          Cert_Type: Cert_Types,
          S1_Wo: S1_Wos,
          S2_Wo: S2_Wos,
          Stage_and_serviceType: Stage_and_serviceTypes,
          Product: Products,
          Address: Addresses,
          GST_Number: GST_Numbers,
          MSME_Number: MSME_Numbers,
          Assessment_Fee: Assessment_Fees,
          Delivered_Month: Delivered_Months,
          SP_Name: SP_Names,
          Requested_Incentive: Requested_Incentives,
          special_Incentives_Amount: special_Incentives_Amounts,
          Agreed_Incentives: Agreed_Incentiveses,
          Invoice_Number: Invoice_Numbers,
          Invoice_Date: Invoice_Dates,
          Invoice_submitted_by_cp: Invoice_submitted_by_cps,
          Remarks: Remark,
          Date_of_pay_Cp: Date_of_pay_Cps,
          status: statuses,
        },
        { where: { Provision_id: provisionId } }
      );
      return res.status(200).send({ code: 200, message: "Data updated successfully", data: provisionData });
    } else {
      return res.status(404).send({ code: 404, message: "No Data found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Get All Created Provision List ///////////////

exports.get_All_Created_Provision_List = async (req, res) => {
  try {
    const employeeId = req.params.employee_id
    const userData = await userDetails.findOne({ where: { employee_id: employeeId } })
    if (userData.user_role == "Cp_verifier") {
      const provisionData = await provisionDetails.findAll({ where: { cp_veriferId: employeeId } });
      if (provisionData) {
        return res.status(200).send({ code: 200, message: "Fetch All Created Provision List Data Successfully!", data: provisionData });
      } else {
        return res.status(404).send({ code: 404, message: "Record not found" })
      }
    } else {
      return res.status(405).send({ code: 405, message: "You are not CP Verifier" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};

/////////////// Get ById Created Provision List ///////////////

exports.get_ById_Created_Provision_List = async (req, res) => {
  try {
    const provisionId = req.params.id
    const getData = await provisionDetails.findOne({ where: { provision_id: provisionId } })
    if (getData) {
      return res.status(200).send({ code: 200, message: "Fetch Provision Data Successfully!", data: getData })
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}

/////////////// Provision RBH Approval ///////////////

exports.provision_RBH_Approval = async (req, res) => {
  try {
    const provisionRbhApprovalId = req.params.id
    const updateData = await provisionRbhApprovalDetail.update({
      "lead_genration_id": req.body.lead_genration_id,
      "rbh_id": req.body.rbh_id,
      "rbh_name": req.body.rbh_name,
      "comments": req.body.comments,
      "status": req.body.status
    }, { where: { provision_rbh_approval_id: provisionRbhApprovalId } })

    await provisionDetails.update({
      "rbh_id": req.body.rbh_id,
      "rbh_name": req.body.rbh_name,
      "comments": req.body.comments,
      "status": req.body.status
    }, { where: { lead_genration_id: req.body.lead_genration_id } })

    await provisionRbhApprovalDetail.update({
      "rbh_id": req.body.rbh_id,
      "rbh_name": req.body.rbh_name,
      "comments": req.body.comments,
      "status": req.body.status
    }, { where: { lead_genration_id: req.body.lead_genration_id } })

    if (req.body.status == "RBH REJECTED") {
      await createProvisionDetails.update({
        "rbh_id": req.body.rbh_id,
        "rbh_name": req.body.rbh_name,
        "comments": req.body.comments,
        "status": req.body.status
      }, { where: { lead_genration_id: req.body.lead_genration_id } })
    }

    return res.status(200).send({ code: 200, message: "Updated Successfully", data: updateData })
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}

/////////////// Get All SP Employee List ///////////////

exports.get_All_SP_Employee_List = async (req, res) => {
  try {
    const userData = await userDetails.findAll({ where: { user_role: "SP" } })
    if (userData) {
      var array = [];
      for (var i = 0; i < userData.length; i++) {
        var obj = {
          "employee_id": userData[i].employee_id,
          "fullName": userData[i].first_name + " " + userData[i].last_name
        }
        array.push(obj);
      }
      return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: array });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}

/////////////// Get All CP Registration Approve List ///////////////

exports.get_All_CP_Registration_Approver_List = async (req, res) => {
  try {
    const getData = await userDetails.findAll({ where: { user_role: "Cp_registration_approver" } })
    if (getData) {
      var array = [];
      for (var i = 0; i < getData.length; i++) {
        var obj = {
          "employee_id": getData[i].employee_id,
          "fullName": getData[i].first_name + " " + getData[i].last_name
        }
        array.push(obj);
      }
      return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: array });
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
}

/////////////// Get Last Created Provision On Provision Details ///////////////

exports.get_Last_Created_Provision_On_Provision_Details = async (req, res) => {
  try {
    const leadManagementId = req.params.lead_genration_id
    const provision_details = await provisionDetails.findAll({ where: { lead_genration_id: leadManagementId } })
    if (provision_details.length !== 0) {
      let senData = provision_details[provision_details.length - 1]
      return res.status(200).send({ code: 200, message: "Fetch All Get Last Created Provision On Provision Details Data Successfully!", data: senData })
    } else {
      return res.status(404).send({ code: 404, message: "Record Not Found" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ code: 500, message: "Server Error" });
  }
};