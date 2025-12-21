
import React from 'react';
import { 
  Syringe, Activity, Droplets, HeartPulse, Lightbulb, 
  Bath, Scissors, Hand, Coffee, Users, FlaskConical, 
  Baby, Pipette, Wind, Flower2, Heart, Scale, 
  CircleDollarSign, UserPlus, Milk, Trash2, ShieldCheck,
  Stethoscope, Ghost, UserX, MonitorPlay
} from 'lucide-react';
import { BirthPlanItem } from './types';

export const BIRTH_PLAN_OPTIONS: BirthPlanItem[] = [
  // DURING LABOR
  { id: 'no-meds', label: 'no medication', description: 'Preferences for natural pain management.', icon: <Syringe />, category: 'Labor', color: 'pink' },
  { id: 'movement', label: 'free movement', description: 'Ability to walk and change positions.', icon: <Activity />, category: 'Labor', color: 'blue' },
  { id: 'water-rupture', label: 'natural water rupture', description: 'Wait for amniotic sac to break naturally.', icon: <Droplets />, category: 'Labor', color: 'blue' },
  { id: 'monitoring', label: 'intermittent monitoring', description: 'Using Doppler instead of continuous belt.', icon: <HeartPulse />, category: 'Labor', color: 'blue' },
  { id: 'lights', label: 'lights dim', description: 'Low lighting for a peaceful atmosphere.', icon: <Lightbulb />, category: 'Labor', color: 'blue' },
  { id: 'water-birth', label: 'water birth', description: 'Laboring or delivering in a tub.', icon: <Bath />, category: 'Labor', color: 'blue' },
  { id: 'no-episiotomy', label: 'no episiotomy', description: 'Letting tissues stretch naturally.', icon: <Scissors />, category: 'Labor', color: 'pink' },
  { id: 'cervical-exams', label: 'limited cervical exams', description: 'Minimize internal checks.', icon: <Hand />, category: 'Labor', color: 'blue' },
  // Fix: category was set to 'pink', changed to 'Labor' and added color: 'pink'
  { id: 'no-sweep', label: 'no membrane sweep', description: 'Avoid manual intervention to induce.', icon: <Hand />, category: 'Labor', color: 'pink' }, 
  { id: 'food-drink', label: 'food and drink', description: 'Light snacks and hydration during labor.', icon: <Coffee />, category: 'Labor', color: 'blue' },
  { id: 'no-students', label: 'no students please', description: 'Prefer only primary staff.', icon: <Users />, category: 'Labor', color: 'pink' },
  { id: 'pitocin', label: 'pitocin only if necessary', description: 'Avoid routine use of induction drugs.', icon: <FlaskConical />, category: 'Labor', color: 'pink' },
  { id: 'vbac', label: 'vbac', description: 'Vaginal birth after cesarean.', icon: <Baby />, category: 'Labor', color: 'blue' },
  { id: 'no-iv', label: 'no IV please', description: 'Prefer hydration by mouth or hep-lock.', icon: <Pipette />, category: 'Labor', color: 'pink' },
  { id: 'nitrous', label: 'Nitrous oxide', description: 'Use of gas for pain relief.', icon: <Wind />, category: 'Labor', color: 'blue' },
  { id: 'no-forceps', label: 'No forceps / vacuum', description: 'Avoid mechanical extraction tools.', icon: <Scissors />, category: 'Labor', color: 'pink' },
  { id: 'lotus', label: 'Lotus birth', description: 'Leaving cord attached until it falls off.', icon: <Flower2 />, category: 'Labor', color: 'blue' },

  // AFTER DELIVERY
  { id: 'skin-skin', label: 'immediate skin-to-skin', description: 'Place baby on chest immediately.', icon: <Heart />, category: 'Delivery', color: 'blue' },
  { id: 'cord-clamp', label: 'delayed cord clamping', description: 'Wait for cord to stop pulsing.', icon: <Activity />, category: 'Delivery', color: 'blue' },
  { id: 'placenta', label: 'save placenta', description: 'Keeping the placenta for personal use.', icon: <Flower2 />, category: 'Delivery', color: 'blue' },
  { id: 'partner-cut', label: 'partner to cut cord', description: 'Birth partner performs the cord cut.', icon: <Scissors />, category: 'Delivery', color: 'blue' },
  { id: 'breastfeeding', label: 'breastfeeding asap', description: 'Early initiation of nursing.', icon: <Milk />, category: 'Delivery', color: 'blue' },
  { id: 'no-vit-k', label: 'no vitamin k', description: 'Opt out of vitamin K shot.', icon: <Syringe />, category: 'Delivery', color: 'pink' },
  { id: 'oral-vit-k', label: 'Oral vitamin k', description: 'Alternative to injection.', icon: <FlaskConical />, category: 'Delivery', color: 'blue' },
  { id: 'no-circ', label: 'no circumcision', description: 'Keeping baby intact.', icon: <Hand />, category: 'Delivery', color: 'pink' },
  { id: 'no-eye', label: 'no eye ointment', description: 'Opt out of antibiotic ointment.', icon: <Pipette />, category: 'Delivery', color: 'pink' },
  { id: 'delay-eye', label: 'delay eye ointment', description: 'Wait for bonding period.', icon: <Pipette />, category: 'Delivery', color: 'blue' },
  { id: 'no-bath', label: 'no bath for baby', description: 'Preserve vernix for 24+ hours.', icon: <Bath />, category: 'Delivery', color: 'pink' },
  { id: 'bonding-exams', label: 'delay exams for bonding', description: 'Exams done while skin-to-skin.', icon: <Stethoscope />, category: 'Delivery', color: 'blue' },
  { id: 'no-formula', label: 'no formula', description: 'Exclusive breast milk/colostrum.', icon: <Milk />, category: 'Delivery', color: 'pink' },
  { id: 'no-hep-b', label: 'no hepatitis b', description: 'Delay or opt out of hep B vaccine.', icon: <Syringe />, category: 'Delivery', color: 'pink' },
  { id: 'limited-visitors', label: 'limited visitors', description: 'Strict privacy for the first hours.', icon: <Users />, category: 'Delivery', color: 'blue' },
  { id: 'no-pacifiers', label: 'no pacifiers', description: 'Avoid nipple confusion.', icon: <Ghost />, category: 'Delivery', color: 'pink' },
  { id: 'cord-blood', label: 'donating cord blood', description: 'Contribution to public health.', icon: <Pipette />, category: 'Delivery', color: 'blue' },

  // CESAREAN SPECIFIC
  { id: 'c-skin-skin', label: 'Partner hold skin-to-skin', description: 'Partner bonds if mother is unable.', icon: <Heart />, category: 'Cesarean', color: 'blue' },
  { id: 'vaginal-swab', label: 'Vaginal swab', description: 'Seeding microbiome for C-section babies.', icon: <Droplets />, category: 'Cesarean', color: 'blue' },
  { id: 'gentle-c', label: 'gentle cesarean', description: 'Slower delivery, clear drape.', icon: <Baby />, category: 'Cesarean', color: 'blue' },
  { id: 'no-relax-drugs', label: 'No extra drugs to relax', description: 'Keep mother alert and aware.', icon: <Users />, category: 'Cesarean', color: 'pink' },
  { id: 'unobtrusive-monitors', label: 'Unobtrusive monitors', description: 'Placing leads on back/side.', icon: <MonitorPlay />, category: 'Cesarean', color: 'pink' },
];