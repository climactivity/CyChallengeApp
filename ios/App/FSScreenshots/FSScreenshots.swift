//
//  FSScreenshots.swift
//  FSScreenshots
//
//  Created by Timo Volk on 25.10.22.
//

import XCTest

final class FSScreenshots: XCTestCase {

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.

        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
        
        let app = XCUIApplication()
        
        setupSnapshot(app)
        app.launch()

    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testScreenshot() throws {
        // UI tests must launch the application that they test.

        snapshot("00ImpactScreen")
        
        let webViewsQuery = XCUIApplication().webViews.webViews.webViews
        webViewsQuery/*@START_MENU_TOKEN@*/.staticTexts["Aktionen"]/*[[".otherElements[\"Climactivity Challenge App\"]",".otherElements[\"navigation\"]",".otherElements[\"Aktionen\"].staticTexts[\"Aktionen\"]",".staticTexts[\"Aktionen\"]"],[[[-1,3],[-1,2],[-1,1,2],[-1,0,1]],[[-1,3],[-1,2],[-1,1,2]],[[-1,3],[-1,2]]],[0]]@END_MENU_TOKEN@*/.tap()
        
        snapshot("01JournalScreen")

        
        let challengesStaticText = webViewsQuery/*@START_MENU_TOKEN@*/.staticTexts["Challenges"]/*[[".otherElements[\"Climactivity Challenge App\"]",".otherElements[\"navigation\"]",".otherElements[\"Challenges\"].staticTexts[\"Challenges\"]",".staticTexts[\"Challenges\"]"],[[[-1,3],[-1,2],[-1,1,2],[-1,0,1]],[[-1,3],[-1,2],[-1,1,2]],[[-1,3],[-1,2]]],[0]]@END_MENU_TOKEN@*/
        challengesStaticText.tap()
       
        snapshot("02ChallengesScreen")

        
        webViewsQuery/*@START_MENU_TOKEN@*/.staticTexts["Feed"]/*[[".otherElements[\"Climactivity Challenge App\"]",".otherElements[\"navigation\"]",".otherElements[\"Feed\"].staticTexts[\"Feed\"]",".staticTexts[\"Feed\"]"],[[[-1,3],[-1,2],[-1,1,2],[-1,0,1]],[[-1,3],[-1,2],[-1,1,2]],[[-1,3],[-1,2]]],[0]]@END_MENU_TOKEN@*/.tap()
        snapshot("03FeedScreenScreen")

        challengesStaticText.tap()
        webViewsQuery/*@START_MENU_TOKEN@*/.otherElements["main"]/*[[".otherElements[\"Climactivity Challenge App\"].otherElements[\"main\"]",".otherElements[\"main\"]"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.children(matching: .other).element(boundBy: 17).staticTexts["Gesundes Leben"].tap()

        snapshot("04ChallengeScreen")

        
        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }

//    func testLaunchPerformance() throws {
//        if #available(macOS 10.15, iOS 13.0, tvOS 13.0, watchOS 7.0, *) {
//            // This measures how long it takes to launch your application.
//            measure(metrics: [XCTApplicationLaunchMetric()]) {
//                XCUIApplication().launch()
//            }
//        }
//    }
}
