import 'cypress-wait-until';


describe('Open COB on Cypress',function(){

    beforeEach(function() {
        cy.fixture('basicDetails').then((basicDetails)=>{

            this.basicDetails=basicDetails;
                
        })
        cy.fixture('childAdress').then((childAdress)=>{
            this.childAdress=childAdress;
        })
        cy.fixture('parentsDetails').then((parentsDetails)=>{
            this.parentsDetails=parentsDetails;
        })
    })
    it('Confirm User is navigated to need analysis',function(){
        cy.visit('http://customer-onboarding-onboarding-uat.apps.staging.devops.inm.corp/needs-analysis')
        cy.get('.option-title')
        .should('contain','Individual Account')
        .should('contain','Joint Account')
        .should('contain','Young Savers Account')

        cy.get('#resume_link').should('contain','Resume')

        cy.get('.title')
        .contains('The easiest way')
        cy.wait(2000)
    })
    it('Open an Young Savers account',function(){
        cy.get('label[for="YOUNG_SAVERS_ACCOUNT"]').click();
    
    })
    it('Confirm whether customer exists',function(){
        //If customer exists
        cy.get('.new-customer-confirmation__display')
        .should('contain','Are you an existing customer?')
        .should('contain','This online account opening application is for customers who are new to I&M Bank and do not already have an account with us.')
        cy.wait(2000)

        cy.get('#new_customer').click()
    })
    it('Verify user is navigated to Young Savers account features page',function(){
        cy.get('.header')
        .should('contain','What do I need to open this account?')
        .should('contain','Key Account Features')
        .should('contain','Additional Benefits')
        cy.wait(2000)
    })

    it('Click on Open Account',function(){
        cy.get('.ui.button').contains('Open this Account').click()
    })

    it('Select Customer residence status',function(){
    //If Customer selects Resident
        cy.get('label[for="residency-type-resident"]').click();
        cy.get('.modal-subtext')
        .should('contain','Select your residency status and we will tell you which documents you will need to have in soft copy.')
        .should('contain','Parent Documents')
        .should('contain','Child Documents')

        cy.get('.doc-label')
        .should('contain','Photo')
        .should('contain','Passport/ Kenyan National ID')
        .should('contain','Signature')
        .should('contain','KRA PIN Number')
        .should('contain','Photo')
        .should('contain','Birth Certificate')

    //If Customer selects non-residence
        cy.wait(2000)
        cy.get('label[for="residency-type-non-resident"]').click();
        cy.get('.modal-subtext')
        .should('contain','Select your residency status and we will tell you which documents you will need to have in soft copy.')
        .should('contain','Parent Documents')
        .should('contain','Child Documents')

        cy.get('.doc-label')
        .should('contain','Photo')
        .should('contain','Passport/ Kenyan National ID')
        .should('contain','Signature')
        .should('contain','KRA PIN Number')
        .should('contain','Photo')
        .should('contain','Birth Certificate')

    //If Customer selects Foreigner
        cy.wait(2000)
        cy.get('label[for="residency-type-foreigner"]').click();
        cy.get('.modal-subtext')
        .should('contain','Select your residency status and we will tell you which documents you will need to have in soft copy.')
        .should('contain','Parent Documents')
        .should('contain','Child Documents')

        cy.get('.doc-label')
        .should('contain','Photo')
        .should('contain','Passport/ Kenyan National ID')
        .should('contain','Signature')
        .should('contain','KRA PIN Number')
        .should('contain','Work Permit')
        .should('contain','Photo')
        .should('contain','Birth Certificate')
    
        cy.wait(2000)
        cy.get('label[for="residency-type-resident"]').click();
        cy.get('#confirm-btn').contains('Confirm').click()
    })
    it('Enter Customer name',function(){
        cy.get('.title-acc-name')
        .should('contain','Young Savers')

        cy.get('.detail')
        .should('contain','Opening your account')
        .should('contain',' will only take a few minutes')

        cy.get('#inm__basic-info-first-name').type(this.basicDetails.firstName).should('have.value','Mohammed')
        cy.get('#inm__basic-info-middle-name').type(this.basicDetails.secondName).should('have.value','Ali')
        cy.get('#inm__basic-info-last-name').type(this.basicDetails.lastName).should('have.value','Wanza')
    })
    it('Select Identification Documents and Enter Identity number',function(){
        //Randomize ID Number
        var randomIDNumber = 'YSA'+Math.random().toString().slice(3,11);

        cy.get('#inm__basic-info-id-type')
        .should('contain','Birth Notification')
        .should('contain','Birth Certificate')

        cy.get('#inm__basic-info-id-type').click()

        cy.get('#inm__basic-info-id-type')
        .contains(this.basicDetails.documentType)
        .click()
        //Enter Birth Certificate Number
        cy.get('#inm__basic-info-identity').type(randomIDNumber)
        //Select Gender
        cy.get('#inm__basic-info-gender').click()

        cy.get('#inm__basic-info-gender')
        .contains(this.basicDetails.gender)
        .click()

        //Select Year
        cy.get('#inm__select-year').click()
        cy.get('#inm__select-year')
        .contains(this.basicDetails.yearOfBirth)
        .click()

        //Select Date of Birth
        cy.get('#inm__select-day').click()
        cy.get('#inm__select-day')
        .contains(this.basicDetails.dayOfBirth)
        .click()

        //Select Month
        cy.get('#inm__select-month').click()
        cy.get('#inm__select-month')
        .contains(this.basicDetails.monthOfBirth)
        .click()

    })

    it('Enter First Parent Details',function(){
        cy.get('#inm__basic-info-id-type-parent').click()
        cy.get('#inm__basic-info-id-type-parent')
        .contains(this.basicDetails.parentIDType)
        .click()
        //Random Phone Number
        var phoneNumber = Math.random().toString().slice(2,10);
        var firstParentNumber = '7'+phoneNumber;

        //Randomize ID Number
        var randomIDNumber = Math.random().toString().slice(3,11);
         //Randomize email_adress
         var email = 'YSA_'+ Math.random().toString(6).substring(4,12) + '@kenya.co.ke';

        cy.get('#inm__basic-info-identity-parent').type(randomIDNumber)

        //Enter Phone number
        cy.get('.react-tel-input').type(firstParentNumber)

        cy.get('#inm__basic-info-email').type(email)
        cy.get('label[for="legalParent"]').click()
        cy.get('#inm__basic-info-referralCode').type(this.basicDetails.referralCode)

        //Accept Terms and Condition
        cy.get('.checkbox').click()
        cy.wait(2000)
        cy.get('#inm__basic-info-next-button').click()
    })
    it('Validate OTP',function(){
        cy.get('.phone-number')
        .should('contain','To verify your number a code was sent to')

        cy.get('#inm__otp-verification-code').type('5555555')

        cy.get('.phone-number', { timeout: 20000 }).should("not.exist");

   })
    
    it('Verify user is navigated to Child address',function(){
        cy.get('.inm__basic-header')
        .should('contain','Child')
        .should('contain','s Address Information')

        cy.get('.inm__progressTracker').should('be.visible')
    })
    it('Enter Childs Address Information',function(){
        //Select Town
        cy.get('#physical_address_town').click()
        cy.get('#physical_address_town')
        .contains(this.childAdress.childsAddressTown)
        .click()

        //Enter Building and Street
        cy.get('#physical_address_building').type(this.childAdress.buildingName)
        cy.get('#physical_address_street').type(this.childAdress.streetName)

        //Enter Postal Address
        cy.get('.intro_h3')
        .should('contain','Do you have a post box?')
        cy.get('label[for="yes_mail_button"').click()
        cy.get('#po_box_number').type(this.childAdress.boxNumber)
        .should('have.value','4040')
        cy.get('#postal_code').type(this.childAdress.postalCode)
        .should('have.value','00100')

        //Click Next to navigate to Parent Details page.
        cy.get('#next_button').click()
    })
    it('Enter Parents information',function(){
        cy.get('.parents-info-header', { timeout: 10000 }).should("exist");
        cy.get('.parents-info-header')
        .should('contain','Parent’s personal information')
        .should('contain','We require details of the child’s parent(s)')

        cy.get('#youngSaversParentFirstName_0').type(this.parentsDetails.parent1_FirstName)
        cy.get('#youngSaversParentMiddleName_0').type(this.parentsDetails.parent1_MiddleName)
        cy.get('#youngSaversParentLastName_0').type(this.parentsDetails.parent1_LastName)

        cy.get('#youngSaversParentGender_0').click()

        cy.get('#youngSaversParentGender_0')
        .contains(this.parentsDetails.parent1_Gender)
        .click()

         //Select First Parent Year of Birth
         cy.get('#inm__select-year').click()
         cy.get('#inm__select-year')
         .contains(this.parentsDetails.parent1_YearOfBirth)
         .click()
 
         //Select First Parent Date of Birth
         cy.get('#inm__select-day').click()
         cy.get('#inm__select-day')
         .contains(this.parentsDetails.parent1_DayOfBirth)
         .click()
 
         //Select First parent Month of Birth
         cy.get('#inm__select-month').click()
         cy.get('#inm__select-month')
         .contains(this.parentsDetails.parent1_MonthOfBirth)
         .click()

         cy.get('#youngSaversParentRelationship_0')
        .should('contain','Mother')
        .should('contain','Father')

        cy.get('#youngSaversParentRelationship_0').click()

        cy.get('#youngSaversParentRelationship_0')
        .contains(this.parentsDetails.parent1_RelationShip)
        .click()
        //Navigate to Parents Income Information Page
        cy.get('#inm__basic-info-next-button').click({ force: true})
    })
    it('Enter Parent Income Information',function(){
        cy.get('.inm__basic-header', {timeout: 5000}).should("exist")
        cy.get('.inm__basic-header')
        .should('contain','More information about the first parent')
        .should('contain','We require additional details about the first parent listed')

        //Enter Parent Income Range
        cy.get('#inm__basic-income-range').click()
        cy.get('#inm__basic-income-range')
        .contains(this.parentsDetails.parent1_IncomeRange)
        .click()

        //Enter Parents Income Source
        cy.get('#inm__basic-income-source').click()
        cy.get('#inm__basic-income-source')
        .contains(this.parentsDetails.parent1_IncomeSource)
        .click()

        //Enter Parents KRA PIN
        cy.get('#inm__kra-pin').type(this.parentsDetails.parent1_KRAPin)
        
        //Check IRS Status and PEP
        cy.get('label[for="no_obligation_button"]').click()
        cy.get('label[for="no_notPEP"]')
    })
    it('Enter Parents address',function(){
        cy.get('#toggle-button-1', {timeout: 5000}).should("exist")
        cy.get('#toggle-button-1')
        .should('contain','Address Details')
        .should('contain','Provide information that we can use to get in touch with you')

        //Maximize address field
        cy.get('#expand-collapse-icon-1').click()

        cy.get('label[for="sameAddressCheckBox"]',{timeout: 5000}).should("exist")
        cy.get('label[for="sameAddressCheckBox"]').click()
        cy.get('#physical_address_building')
        .should('not.be.visible')
        cy.get('#physical_address_street')
        .should('not.be.visible')

        cy.get('#next_button').click()
    })
    it('Select Customer Branch',function(){
        cy.get('.inm__select-branch-header',{timeout: 5000}).should("exist")
        cy.get('.inm__select-branch-header')
        .should('contain','Choose your branch')
        //Select Preferred Branch
        cy.get('#branch_address').click()
        cy.get('#branch_address')
        .contains(this.parentsDetails.prefferedBranch)
        //.find('.inn__branch-name')
        //.type(this.parentsDetails.prefferedBranch,{timeout:10000})
        //.trigger('mouseover')
        .click()

        cy.get('#next_button',{timeout: 5000}).click()

    })
    it('Navigate to Minor Documents Upload Page',function(){
        cy.get('.minor-uploads__wrapper__header')
        .should('contain','Upload images of the child’s birth notification and photo')
        .should('contain','We require you to upload documents for the child')

        cy.get('.uploadContainerLabel')
        .should('contain',this.basicDetails.documentType)
    })
    it('Upload Birth Notification/Certificate',function(){
        //Click Upload Button to upload Birth Certifictae/Notification
        cy.get('#birthNotification').upload('{birthCertificate,bimage/png:C:\\Users\\nelson.njenga\\Documents\\COB_DOCS\\birthCertificate.jpg}')

        cy.waitUntil(() => cy.get('.reUploadButton')
        .and('contain','re-upload')
        .should('be.visible'))
    })

})