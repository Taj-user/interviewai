import { createContext, useContext, useState } from "react";

const OnboardingContext = createContext()

export function OnboardingProvider({ children })
{
    const [answers, setAnswers] = useState({
        field_of_study: "",
        experience_level: "",
        target_company_type: "",
        focus_area: "",
        practice_duration: "",
    })

    const updateAnswer = (key, value) => {
        setAnswers((prev) => ({ ...prev, [key]: value }))
    }

    return (
        <OnboardingContext.Provider value={{ answers, updateAnswer }}>
            {children}
        </OnboardingContext.Provider>
    )
}

export function useOnboarding()
{
    return useContext(OnboardingContext)
}