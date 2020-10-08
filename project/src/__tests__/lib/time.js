import {getHoursMinutesAndSecondsFromDurationInSeconds} from "../../lib/time"

describe("getHoursMinutesAndSecondsFromDurationInSeconds", () => {
    describe('for duration less than minute', () => {
        it("works for 30 seconds", () => {
            expect(
                getHoursMinutesAndSecondsFromDurationInSeconds(30)
            ).toEqual([0,0,30]);
        });
        
        it("returns 30 seconds for 30 second-duration", () => {
            expect(
                getHoursMinutesAndSecondsFromDurationInSeconds(30)[2]
            ).toEqual(30);
        });
        
        it("returns 0 minutes for 30 second-duration", () => {
            expect(
                getHoursMinutesAndSecondsFromDurationInSeconds(30)[1]
            ).toEqual(0);
        });
    });
    
    describe('for duration more than minute', () => {
        it("returns 2 minutes 20 seconds for 140 seconds-duration", () => {
            expect(
                getHoursMinutesAndSecondsFromDurationInSeconds(140)
            ).toEqual([0,2,20]);
        });
    
        it('returns 1 minute for 60 seconds-duration', () => {
            expect(
                getHoursMinutesAndSecondsFromDurationInSeconds(60)[1]
            ).toBe(1)
        });
    });
    
})
