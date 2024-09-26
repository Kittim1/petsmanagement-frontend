'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const [pets, setPets] = useState([]);
  const [species, setSpecies] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [owners, setOwners] = useState([]);
  const [showPetModal, setShowPetModal] = useState(false);
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [showSpeciesModal, setShowSpeciesModal] = useState(false);
  const [showBreedModal, setShowBreedModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [filterType, setFilterType] = useState('pets');
  const [formData, setFormData] = useState({
    name: '',
    speciesID: '',
    breedID: '',
    dateOfBirth: '',
    ownerID: '',
  });
  const [ownerFormData, setOwnerFormData] = useState({
    ownerName: '',
    ownerContactDetails: '',
    ownerAddress: '',
  });
  const [speciesFormData, setSpeciesFormData] = useState({
    speciesName: '',
  });
  const [breedFormData, setBreedFormData] = useState({
    breedName: '',
    speciesID: '',
  });

  useEffect(() => {
    fetchFilteredData();
  }, [filterType]);

  const fetchFilteredData = () => {
    if (filterType === 'pets') fetchPets();
    else if (filterType === 'species') fetchSpecies();
    else if (filterType === 'breeds') fetchBreeds();
    else if (filterType === 'owners') fetchOwners();
  };

  const fetchPets = async () => {
    try {
      const url = 'http://localhost/p3project/pets.php';
      const formData = new FormData();
      formData.append("operation", "getPetDetails");
      const res = await axios.post(url, formData);
      if (res.data !== 0) setPets(res.data);
    } catch (error) {
      toast.error("Network error");
      console.log(error);
    }
  };

  const fetchSpecies = async () => {
    try {
      const formData = new FormData();
      formData.append("operation", "getSpeciesDetails");
      const response = await axios.post("http://localhost/p3project/pets.php", formData);
      const speciesData = response.data !== 0 ? response.data : [];
      setSpecies(speciesData);
    } catch (error) {
      console.error("Error fetching species data:", error);
    }
  };

  const fetchBreeds = async () => {
    try {
      const formData = new FormData();
      formData.append("operation", "getBreedDetails");
      const response = await axios.post("http://localhost/p3project/pets.php", formData);
      const breedData = response.data !== 0 ? response.data : [];
      setBreeds(breedData);
    } catch (error) {
      console.error("Error fetching breed data:", error);
    }
  };

  const fetchOwners = async () => {
    try {
      const url = 'http://localhost/p3project/pets.php';
      const formData = new FormData();
      formData.append("operation", "getOwnerDetails");
      const res = await axios.post(url, formData);
      if (res.data !== 0) setOwners(res.data);
    } catch (error) {
      toast.error("Network error");
      console.log(error);
    }
  };

  const handleAddOrEditPet = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost/p3project/pets.php';
      const jsonData = {
        pet_name: formData.name,
        species_id: formData.speciesID,
        breed_id: formData.breedID,
        date_of_birth: formData.dateOfBirth,
        owner_id: formData.ownerID
      };
      const formDatas = new FormData();
      formDatas.append("json", JSON.stringify(jsonData));
      formDatas.append("operation", "addPets");
      const res = await axios.post(url, formDatas);
      if (res.data === 1) {
        toast.success('Pet added successfully!');
        setShowPetModal(false);
        fetchPets();
      }
    } catch (error) {
      toast.error("Network error");
      console.log("error", error);
    }
  };

  const handleAddOwner = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost/p3project/pets.php';
      const jsonData = {
        owner_name: ownerFormData.ownerName,
        owner_contact_details: ownerFormData.ownerContactDetails,
        owner_address: ownerFormData.ownerAddress
      };
      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "addOwners");
      const res = await axios.post(url, formData);
      if (res.data === 1) {
        toast.success('Owner added successfully!');
        setShowOwnerModal(false);
        fetchOwners();
      }
    } catch (error) {
      toast.error("Network error");
      console.log(error);
    }
  };

  const handleAddSpecies = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost/p3project/pets.php';
      const jsonData = {
        species_name: speciesFormData.speciesName
      };
      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));
      formData.append("operation", "addSpecies");
      const res = await axios.post(url, formData);
      if (res.data === 1) {
        toast.success('Species added successfully!');
        setShowSpeciesModal(false);
        fetchSpecies();
      }
    } catch (error) {
      toast.error("Network error");
      console.log(error);
    }
  };

  const handleAddBreed = async (e) => {
    e.preventDefault();
    try {
      const url = 'http://localhost/p3project/pets.php';
      const jsonData = {
        breed_name: breedFormData.breedName,
        species_id: breedFormData.speciesID
      };
      const formDatas = new FormData();
      formDatas.append("json", JSON.stringify(jsonData));
      formDatas.append("operation", "addBreeds");
      const res = await axios.post(url, formDatas);
      if (res.data === 1) {
        toast.success('Breed added successfully!');
        setShowBreedModal(false);
        fetchBreeds();
      }
    } catch (error) {
      toast.error("Network error");
      console.log(error);
    }
  };

  const openPetModal = (type, pet = null) => {
    setModalType(type);
    setShowPetModal(true);
    if (pet) {
      setFormData({
        petID: pet.PetID,
        name: pet.PetName,
        speciesID: pet.SpeciesID,
        breedID: pet.BreedID,
        dateOfBirth: pet.DateOfBirth,
        ownerID: pet.OwnerID,
      });
    } else {
      setFormData({
        name: '',
        speciesID: '',
        breedID: '',
        dateOfBirth: '',
        ownerID: '',
      });
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-gray-500 to-gray-400 min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-black">My Pets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Button onClick={() => openPetModal('add')}>Add Pet</Button>
            <Button onClick={() => setShowOwnerModal(true)}>Add Owner</Button>
            <Button onClick={() => setShowSpeciesModal(true)}>Add Species</Button>
            <Button onClick={() => setShowBreedModal(true)}>Add Breed</Button>
          </div>
          <h3 className="text-start text-black mt-4">Filtered by:</h3>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pets">Pets</SelectItem>
              <SelectItem value="species">Species</SelectItem>
              <SelectItem value="breeds">Breeds</SelectItem>
              <SelectItem value="owners">Owners</SelectItem>
            </SelectContent>
          </Select>

          <h2 className="text-center text-black mt-4">Pet Info</h2>

          {filterType === 'pets' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Owner's Name</TableHead>
                  <TableHead>Pet Name</TableHead>
                  <TableHead>Species Name</TableHead>
                  <TableHead>Breed Name</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pets.map((pet, index) => (
                  <TableRow key={index}>
                    <TableCell>{pet.owner_name}</TableCell>
                    <TableCell>{pet.pet_name}</TableCell>
                    <TableCell>{pet.species_name}</TableCell>
                    <TableCell>{pet.breed_name}</TableCell>
                    <TableCell>{pet.date_of_birth}</TableCell>
                    <TableCell>
                      <Button variant="outline" onClick={() => openPetModal('edit', pet)}>Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {filterType === 'species' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Species ID</TableHead>
                  <TableHead>Species Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {species.map((s) => (
                  <TableRow key={s.species_id}>
                    <TableCell>{s.species_id}</TableCell>
                    <TableCell>{s.species_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {filterType === 'breeds' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Breed ID</TableHead>
                  <TableHead>Breed Name</TableHead>
                  <TableHead>Species Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {breeds.map((b) => (
                  <TableRow key={b.breed_id}>
                    <TableCell>{b.breed_id}</TableCell>
                    <TableCell>{b.breed_name}</TableCell>
                    <TableCell>{b.species_name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {filterType === 'owners' && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Owner ID</TableHead>
                  <TableHead>Owner Name</TableHead>
                  <TableHead>Contact Details</TableHead>
                  <TableHead>Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {owners.map((o) => (
                  <TableRow key={o.owner_id}>
                    <TableCell>{o.owner_id}</TableCell>
                    <TableCell>{o.owner_name}</TableCell>
                    <TableCell>{o.owner_contact_details}</TableCell>
                    <TableCell>{o.owner_address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={showPetModal} onOpenChange={setShowPetModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modalType === 'add' ? 'Add Pet' : 'Edit Pet'}</DialogTitle>
          </DialogHeader>
          <Form onSubmit={handleAddOrEditPet}>
          <FormField>
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Species</FormLabel>
              <FormControl>
                <Select
                  value={formData.speciesID}
                  onValueChange={(value) => setFormData({ ...formData, speciesID: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select species" />
                  </SelectTrigger>
                  <SelectContent>
                    {species.map((s) => (
                      <SelectItem key={s.species_id} value={s.species_id}>
                        {s.species_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Breed</FormLabel>
              <FormControl>
                <Select
                  value={formData.breedID}
                  onValueChange={(value) => setFormData({ ...formData, breedID: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select breed" />
                  </SelectTrigger>
                  <SelectContent>
                    {breeds.map((b) => (
                      <SelectItem key={b.breed_id} value={b.breed_id}>
                        {b.breed_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Owner</FormLabel>
              <FormControl>
                <Select
                  value={formData.ownerID}
                  onValueChange={(value) => setFormData({ ...formData, ownerID: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select owner" />
                  </SelectTrigger>
                  <SelectContent>
                    {owners.map((o) => (
                      <SelectItem key={o.owner_id} value={o.owner_id}>
                        {o.owner_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
            <Button type="submit">{modalType === 'add' ? 'Add Pet' : 'Save Changes'}</Button>
          </FormField>
        </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={showOwnerModal} onOpenChange={setShowOwnerModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Owner</DialogTitle>
          </DialogHeader>
          <Form onSubmit={handleAddOwner}>
            <FormField>
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter owner's name"
                    value={ownerFormData.ownerName}
                    onChange={(e) => setOwnerFormData({ ...ownerFormData, ownerName: e.target.value })}
                  />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField>
              <FormItem>
                <FormLabel>Contact Details</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter owner's contact details"
                    value={ownerFormData.ownerContactDetails}
                    onChange={(e) => setOwnerFormData({ ...ownerFormData, ownerContactDetails: e.target.value })}
                  />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField>
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter owner's address"
                    value={ownerFormData.ownerAddress}
                    onChange={(e) => setOwnerFormData({ ...ownerFormData, ownerAddress: e.target.value })}
                  />
                </FormControl>
              </FormItem>
            </FormField>
            <Button type="submit">Add Owner</Button>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={showSpeciesModal} onOpenChange={setShowSpeciesModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Species</DialogTitle>
          </DialogHeader>
          <Form onSubmit={handleAddSpecies}>
            <FormField>
              <FormItem>
                <FormLabel>Species Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter species name"
                    value={speciesFormData.speciesName}
                    onChange={(e) => setSpeciesFormData({ ...speciesFormData, speciesName: e.target.value })}
                  />
                </FormControl>
              </FormItem>
            </FormField>
            <Button type="submit">Add Species</Button>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={showBreedModal} onOpenChange={setShowBreedModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Breed</DialogTitle>
          </DialogHeader>
          <Form onSubmit={handleAddBreed}>
            <FormField>
              <FormItem>
                <FormLabel>Breed Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter breed name"
                    value={breedFormData.breedName}
                    onChange={(e) => setBreedFormData({ ...breedFormData, breedName: e.target.value })}
                  />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField>
              <FormItem>
                <FormLabel>Species</FormLabel>
                <Select
                  value={breedFormData.speciesID}
                  onValueChange={(value) => setBreedFormData({ ...breedFormData, speciesID: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select species" />
                  </SelectTrigger>
                  <SelectContent>
                    {species.map((s) => (
                      <SelectItem key={s.species_id} value={s.species_id}>
                        {s.species_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            </FormField>
            <Button type="submit">Add Breed</Button>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}