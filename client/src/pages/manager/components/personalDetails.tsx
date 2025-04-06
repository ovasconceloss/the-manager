import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PersonalDetailsFormProps {
  managerData: any;
  setManagerData: (data: any) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ managerData, setManagerData }) => {
    const handlePersonalDetailsChange = (key: string, value: string) => {
        setManagerData((prev: any) => ({
            ...prev,
            personalDetails: { ...prev.personalDetails, [key]: value },
        }));
    };
    
    return (
    <>
    <form className="mt-5 space-y-6">
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <Input
                    type="text"
                    placeholder="Enter your name"
                    className="bg-[#1E1E26] border border-[#2A2A35]"
                    value={managerData.personalDetails.name}
                    onChange={(e) => handlePersonalDetailsChange("name", e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Surname *</label>
                <Input
                    type="text"
                    placeholder="Enter your surname"
                    className="bg-[#1E1E26] border border-[#2A2A35]"
                    value={managerData.personalDetails.surname}
                    onChange={(e) => handlePersonalDetailsChange("surname", e.target.value)}
                />
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-1">Nationality *</label>
                <Select value={managerData.personalDetails.nationality} onValueChange={(value) => handlePersonalDetailsChange("nationality", value)}>
                    <SelectTrigger className="bg-[#19181F] border border-[#2A2A35]">
                        <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#19181F]">
                        <SelectItem value="English" className="cursor-pointer focus:bg-[#67159C] focus:text-white text-white">English</SelectItem>
                        <SelectItem value="Spanish" className="cursor-pointer focus:bg-[#67159C] focus:text-white text-white">Spanish</SelectItem>
                        <SelectItem value="French" className="cursor-pointer focus:bg-[#67159C] focus:text-white text-white">French</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Place of Birth</label>
                <Select value={managerData.personalDetails.placeOfBirth} onValueChange={(value) => handlePersonalDetailsChange("placeOfBirth", value)}>
                    <SelectTrigger className="bg-[#19181F] border border-[#2A2A35]">
                        <SelectValue placeholder="Select place of birth" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#19181F]">
                        <SelectItem value="London" className="cursor-pointer focus:bg-[#67159C] focus:text-white text-white">London</SelectItem>
                        <SelectItem value="Madrid" className="cursor-pointer focus:bg-[#67159C] focus:text-white text-white">Madrid</SelectItem>
                        <SelectItem value="Paris" className="cursor-pointer focus:bg-[#67159C] focus:text-white text-white">Paris</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-1">Date of Birth *</label>
                <Input
                    type="date"
                    className="bg-[#1E1E26] border border-[#2A2A35]"
                    value={managerData.personalDetails.dateOfBirth}
                    onChange={(e) => handlePersonalDetailsChange("dateOfBirth", e.target.value)}
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Gender *</label>
                <Select value={managerData.personalDetails.gender} onValueChange={(value) => handlePersonalDetailsChange("gender", value)}>
                    <SelectTrigger className="bg-[#19181F] border border-[#2A2A35]">
                        <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#19181F]">
                        <SelectItem value="male" className="cursor-pointer focus:bg-[#67159C] focus:text-white text-white">Male</SelectItem>
                        <SelectItem value="female" className="cursor-pointer focus:bg-[#67159C] focus:text-white text-white">Female</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    </form>
    </> 
  );
};

export default PersonalDetailsForm;