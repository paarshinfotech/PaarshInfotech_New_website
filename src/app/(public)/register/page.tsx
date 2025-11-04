"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Check, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DropdownOption {
  _id: string;
  name: string;
  durationInMonths?: number;
}

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [colleges, setColleges] = useState<DropdownOption[]>([]);
  const [internshipTypes, setInternshipTypes] = useState<DropdownOption[]>([]);
  const [durations, setDurations] = useState<DropdownOption[]>([]);
  const [modes, setModes] = useState<DropdownOption[]>([]);

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeUploading, setResumeUploading] = useState(false);

  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentUploading, setPaymentUploading] = useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedRefundPolicy, setAcceptedRefundPolicy] = useState(false);

  const [termsContent, setTermsContent] = useState("");
  const [refundContent, setRefundContent] = useState("");

  const [openCollegeCombobox, setOpenCollegeCombobox] = useState(false);
  const [openTypeCombobox, setOpenTypeCombobox] = useState(false);

  const [showPolicies, setShowPolicies] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    address: "",
    college: "",
    internshipType: "",
    attendanceMode: "",
    joiningDate: "",
    internshipDuration: "",
    hasLaptop: "",
    referralName: "",
    internshipNote: "",
  });

  // Fetch dropdown data on mount
  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const [collegesRes, typesRes, durationsRes, modesRes, policiesRes] =
        await Promise.all([
          fetch("/api/colleges"),
          fetch("/api/internship-types"),
          fetch("/api/durations"),
          fetch("/api/modes"),
          fetch("/api/internship-policies"),
        ]);

      const [collegesData, typesData, durationsData, modesData, policiesData] =
        await Promise.all([
          collegesRes.json(),
          typesRes.json(),
          durationsRes.json(),
          modesRes.json(),
          policiesRes.json(),
        ]);

      if (collegesData.success) setColleges(collegesData.data);
      if (typesData.success) setInternshipTypes(typesData.data);
      if (durationsData.success) setDurations(durationsData.data);
      if (modesData.success) setModes(modesData.data);

      if (policiesData.success) {
        const termsPolicy = policiesData.data.find(
          (p: any) => p.type === "terms"
        );
        const refundPolicy = policiesData.data.find(
          (p: any) => p.type === "refund"
        );
        if (termsPolicy) setTermsContent(termsPolicy.content);
        if (refundPolicy) setRefundContent(refundPolicy.content);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load form data",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (
    file: File,
    category: "resume" | "payment"
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    const setUploading =
      category === "resume" ? setResumeUploading : setPaymentUploading;
    const setUrl = category === "resume" ? setResumeUrl : setPaymentUrl;

    setUploading(true);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUrl(data.data.url);
        toast({
          title: "Success",
          description: `${
            category === "resume" ? "Resume" : "Payment screenshot"
          } uploaded successfully`,
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeUrl || !paymentUrl) {
      toast({
        title: "Error",
        description: "Please upload both resume and payment screenshot",
        variant: "destructive",
      });
      return;
    }

    if (!acceptedTerms) {
      toast({
        title: "Error",
        description: "Please accept the Terms and Conditions",
        variant: "destructive",
      });
      return;
    }

    if (!acceptedRefundPolicy) {
      toast({
        title: "Error",
        description: "Please accept the Refund Policy",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          hasLaptop: formData.hasLaptop === "yes",
          resumeUrl,
          paymentScreenshotUrl: paymentUrl,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Registration Successful!",
          description: data.message,
        });

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          contactNumber: "",
          address: "",
          college: "",
          internshipType: "",
          attendanceMode: "",
          joiningDate: "",
          internshipDuration: "",
          hasLaptop: "",
          referralName: "",
          internshipNote: "",
        });
        setResumeFile(null);
        setResumeUrl("");
        setPaymentFile(null);
        setPaymentUrl("");
        setAcceptedTerms(false);
        setAcceptedRefundPolicy(false);

        // Optionally redirect
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit registration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl text-blue-900 font-bold text-center">
              Internship Registration
            </CardTitle>
            <CardDescription className="text-center text-lg">
              Paarsh Infotech Pvt. Ltd.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactNumber">Contact Number *</Label>
                    <Input
                      id="contactNumber"
                      required
                      value={formData.contactNumber}
                      onChange={(e) =>
                        handleInputChange("contactNumber", e.target.value)
                      }
                      placeholder="+91 1234567890"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Your complete address"
                    />
                  </div>
                </div>
              </div>

              {/* Academic & Internship Details */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Academic & Internship Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="college">College *</Label>
                    <Popover
                      open={openCollegeCombobox}
                      onOpenChange={setOpenCollegeCombobox}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCollegeCombobox}
                          className="w-full justify-between mt-2"
                        >
                          {formData.college
                            ? colleges.find(
                                (college) => college._id === formData.college
                              )?.name
                            : "Select your college"}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search college..." />
                          <CommandList>
                            <CommandEmpty>No college found.</CommandEmpty>
                            <CommandGroup>
                              {colleges.map((college) => (
                                <CommandItem
                                  key={college._id}
                                  value={college.name}
                                  onSelect={() => {
                                    handleInputChange("college", college._id);
                                    setOpenCollegeCombobox(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formData.college === college._id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {college.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="internshipType">Internship Type *</Label>
                    <Popover
                      open={openTypeCombobox}
                      onOpenChange={setOpenTypeCombobox}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openTypeCombobox}
                          className="w-full justify-between mt-2"
                        >
                          {formData.internshipType
                            ? internshipTypes.find(
                                (type) => type._id === formData.internshipType
                              )?.name
                            : "Select internship type"}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search internship type..." />
                          <CommandList>
                            <CommandEmpty>
                              No internship type found.
                            </CommandEmpty>
                            <CommandGroup>
                              {internshipTypes.map((type) => (
                                <CommandItem
                                  key={type._id}
                                  value={type.name}
                                  onSelect={() => {
                                    handleInputChange(
                                      "internshipType",
                                      type._id
                                    );
                                    setOpenTypeCombobox(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      formData.internshipType === type._id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {type.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Attendance Mode *</Label>
                    <RadioGroup
                      value={formData.attendanceMode}
                      onValueChange={(value) =>
                        handleInputChange("attendanceMode", value)
                      }
                      className="mt-2 space-y-2"
                    >
                      {modes.map((mode) => (
                        <div
                          key={mode._id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={mode._id}
                            id={`mode-${mode._id}`}
                          />
                          <Label
                            htmlFor={`mode-${mode._id}`}
                            className="font-normal cursor-pointer"
                          >
                            {mode.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Internship Duration *</Label>
                    <RadioGroup
                      value={formData.internshipDuration}
                      onValueChange={(value) =>
                        handleInputChange("internshipDuration", value)
                      }
                      className="mt-2 space-y-2"
                    >
                      {durations.map((duration) => (
                        <div
                          key={duration._id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={duration._id}
                            id={`duration-${duration._id}`}
                          />
                          <Label
                            htmlFor={`duration-${duration._id}`}
                            className="font-normal cursor-pointer"
                          >
                            {duration.name}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="joiningDate">Joining Date *</Label>
                    <Input
                      id="joiningDate"
                      type="date"
                      required
                      value={formData.joiningDate}
                      onChange={(e) =>
                        handleInputChange("joiningDate", e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <Label>Do you have a laptop? *</Label>
                    <RadioGroup
                      value={formData.hasLaptop}
                      onValueChange={(value) =>
                        handleInputChange("hasLaptop", value)
                      }
                      className="mt-2 flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="laptop-yes" />
                        <Label
                          htmlFor="laptop-yes"
                          className="font-normal cursor-pointer"
                        >
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="laptop-no" />
                        <Label
                          htmlFor="laptop-no"
                          className="font-normal cursor-pointer"
                        >
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Optional Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Additional Information
                </h3>

                <div>
                  <Label htmlFor="referralName">Referral Name (Optional)</Label>
                  <Input
                    id="referralName"
                    value={formData.referralName}
                    onChange={(e) =>
                      handleInputChange("referralName", e.target.value)
                    }
                    placeholder="Name of person who referred you"
                  />
                </div>

                <div>
                  <Label htmlFor="internshipNote">
                    Internship Note (Optional)
                  </Label>
                  <Textarea
                    id="internshipNote"
                    value={formData.internshipNote}
                    onChange={(e) =>
                      handleInputChange("internshipNote", e.target.value)
                    }
                    placeholder="Any additional information or requirements"
                    rows={4}
                  />
                </div>
              </div>

              {/* File Uploads */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Required Documents</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Resume Upload */}
                  <div>
                    <Label htmlFor="resume">Resume *</Label>
                    <div className="mt-2">
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setResumeFile(file);
                            handleFileUpload(file, "resume");
                          }
                        }}
                        disabled={resumeUploading}
                      />
                      {resumeUploading && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-blue-600">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Uploading...
                        </div>
                      )}
                      {resumeUrl && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                          <Check className="h-4 w-4" />
                          Resume uploaded successfully
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Payment Screenshot Upload */}
                  <div>
                    <Label htmlFor="payment">Payment Screenshot *</Label>
                    <div className="mt-2">
                      <Input
                        id="payment"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setPaymentFile(file);
                            handleFileUpload(file, "payment");
                          }
                        }}
                        disabled={paymentUploading}
                      />
                      {paymentUploading && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-blue-600">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Uploading...
                        </div>
                      )}
                      {paymentUrl && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                          <Check className="h-4 w-4" />
                          Payment screenshot uploaded successfully
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4 pt-4 border-t">
                <div>
                  <button
                    type="button"
                    className="text-blue-700 text-xs font-medium flex items-center gap-1"
                    onClick={() => setShowPolicies((prev) => !prev)}
                    aria-expanded={showPolicies}
                  >
                    
                    {showPolicies
                      ? "Hide Details"
                      : "Show Terms & Conditions & Refund Policy"}{showPolicies ? (
                      <ChevronLeft className="h-4 w-4 transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                    )}
                  </button>
                  {showPolicies && (
                    <div className="space-y-6 mt-4">
                      {/* Combined Terms and Refund Policy Section */}
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">
                          Terms & Conditions
                        </Label>
                        <div className="border rounded-md p-4 bg-gray-50">
                          {termsContent ? (
                            <div className="whitespace-pre-wrap text-xs leading-relaxed">
                              {termsContent}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-sm">
                              No terms and conditions available.
                            </p>
                          )}

                          {refundContent ? (
                            <div className="whitespace-pre-wrap text-xs leading-relaxed">
                              {refundContent}
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-sm">
                              No refund policy available.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Accept Checkbox (always visible) */}
                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                      id="acceptPolicies"
                      checked={acceptedTerms && acceptedRefundPolicy}
                      onCheckedChange={(checked) => {
                        setAcceptedTerms(checked as boolean);
                        setAcceptedRefundPolicy(checked as boolean);
                      }}
                    />
                    <Label
                      htmlFor="acceptPolicies"
                      className="text-sm font-medium cursor-pointer leading-tight"
                    >
                      I have read and agree to the Terms & Conditions & Refund
                      Policy *
                    </Label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={
                    isLoading ||
                    !resumeUrl ||
                    !paymentUrl ||
                    !acceptedTerms ||
                    !acceptedRefundPolicy
                  }
                  className="w-full md:w-auto min-w-[200px]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
